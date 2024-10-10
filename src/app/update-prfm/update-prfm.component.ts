import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InfosService } from '../services/infos.service';
import { TicketsService } from '../services/tickets.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedTitleService } from '../services/shared-title.service';

@Component({
  selector: 'app-update-prfm',
  templateUrl: './update-prfm.component.html',
  styleUrls: ['./update-prfm.component.scss']
})
export class UpdatePrfmComponent implements OnInit {
  selectedFiles: File[] = [];
  text: string  = 'Your ticket has been successfully modified.';
  askedUuid!: string | null;
  asked: any;
  attachements: any[] = [];
  isBrowsefiles: boolean = false;
  allStatus: any[] = [];
  files: any[] = [];
  effects: any[] = [];
  attachementToDelete: any;
  updateStatus: boolean = false;
  fileToDelete: any;
  updateDescription: boolean = false;
  updateResume: boolean = false;
  updateSide: boolean = false;
  sides: any[] = [];
  prfs_asked_uuid: string = "";
  isVisible: boolean = false;
  askedLogByAsked: any[] = [];
  isDeleteFileToDownloadTicketVisible: boolean = false;
  isDeleteFileTicketVisible: boolean = false;
  maxFileCount: number = 10;
  effectsAsked: any[] = [];
  prfss: any[] = [];
  prfssAsked: any[] = [];
  shipsAsked: any[] = [];
  prfssAdded: any[] = [];
  shipsAdded: any[] = [];
  ships: any[] = [];
  loading: boolean = false;
  ship_uuid: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private infosService: InfosService,
    private ticketsService: TicketsService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.askedUuid = params.get('asked_uuid');
      if (this.askedUuid) {
        this.getAskedLogs(this.askedUuid);
        this.fetchAskedData();
        this.getAttachements();
        this.fetchRelatedPrfs(this.askedUuid);
        this.fetchRelatedShips(this.askedUuid);
      }
    });

    this.fetchStatus();
    this.fetchSides();
    this.fetchEffects();
    this.fetchPRFS();
    this.fetchShips();
  }

  fetchRelatedPrfs(asked_id :string) {
    this.ticketsService.getRelatedPrfs(asked_id).subscribe(
      (data) => {
        this.prfssAsked = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  toggleBrowsefiles() {
    this.isBrowsefiles = !this.isBrowsefiles;
  }

  private fetchShips() {
    this.infosService.getShips().subscribe(
      data => {
        console.log(data);
        this.ships = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  fetchRelatedShips(asked_id :string) {
    this.ticketsService.getRelatedShips(asked_id).subscribe(
      (data) => {
        this.shipsAsked = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchEffects(): void {
    this.infosService.getEffects().subscribe(
      data => {
        this.effects = data;
      },
      error => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  private fetchPRFS(): void {
    this.ticketsService.getAskedPRFS().subscribe(
      data => {
        this.prfss = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchStatus(): void {
    this.infosService.getStatuses().subscribe(
      data => {
        this.allStatus = data;
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  private fetchSides(): void {
    this.infosService.getSides().subscribe(
      data => {
        this.sides = data;
      },
      error => {
        console.error('Erreur lors de la récupération des côtés:', error);
      }
    );
  }

  fetchAskedData(): void {
    if (this.askedUuid !== null) {
      this.ticketsService.getOneAskedPRFMData(this.askedUuid).subscribe(
        data => {
          this.asked = data;
          this.sharedTitleService.changeTitle(this.asked.asked_ref);
        },
        error => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  addAskedToTable() {
    if (this.askedUuid && !this.prfssAdded.includes(this.prfs_asked_uuid)) {
      this.ticketsService.getOneAskedPRFSData(this.prfs_asked_uuid).subscribe(
        response => {
          this.prfssAdded.push(response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );

      this.prfs_asked_uuid = '';
    }
  }

  addShipToTable() {
    if (this.askedUuid && !this.shipsAdded.includes(this.ship_uuid)) {
      this.infosService.getShip(this.ship_uuid).subscribe(
        response => {
          this.shipsAdded.push(response);
          this.ship_uuid = '';        
        },
        error => {
          console.error('Erreur:', error);
        }
      );

      this.prfs_asked_uuid = '';
    }
  }

  removeAsked(index: number) {
    this.prfssAdded.splice(index, 1);
  }

  removeShip(index: number) {
    this.shipsAdded.splice(index, 1);
  }

  private getAskedLogs(id: string) {
    this.infosService.getLogAsked(id).subscribe(
      data => {
        console.log('asked log', data);
        this.askedLogByAsked = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  private getAttachements() {
    if (this.askedUuid !== null) {
      this.ticketsService.getAttachements(this.askedUuid).subscribe(
        data => {
          console.log(data, 'Data attachements');
          this.attachements = data;
        },
        error => {
          console.error('Erreur lors de la récupération des types d\'effet:', error);
        }
      );
    }
  }

   onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = event.dataTransfer?.files;

    console.log(droppedFiles)

    if (droppedFiles && droppedFiles.length > 0) {
       this.selectedFiles=Array.from(droppedFiles);
      const droppedFilesWithNameAndSize = Array.from(droppedFiles).map((file) => ({ name: file.name, size: file.size }));
      this.handleFiles(droppedFilesWithNameAndSize);
    }
  }


  toggleDeleteFileToDownloadTicket(att: any) {
    this.fileToDelete = att;
    this.isDeleteFileToDownloadTicketVisible = !this.isDeleteFileToDownloadTicketVisible;
  }

  onFileChange(event: any, fileType: string) {
    const files = event.target.files;
    const timestamp = this.getCurrentTimestamp();
  
    const renamedFiles = Array.from(files).map((file: any, index: number) => {
      const fileExtension = file.name.split('.').pop();
      const newFileName = `${fileType}_${timestamp}.${fileExtension}`;
      return new File([file], newFileName, { type: file.type });
    });
  
    this.selectedFiles.push(...renamedFiles); 
    this.handleFiles(renamedFiles);
  }

  getCurrentTimestamp(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${year}${month}${day}_${hours}${minutes}`;
  }

  handleFiles(files: any[]) {
    for (const file of files) {
      this.files.push({ name: file.name, size: this.formatFileSize(file.size) });
    }
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024);
    return megabytes.toFixed(2) + ' Mo';
  }

  toggleUpdateDescription() {
    this.updateDescription = !this.updateDescription;
  }

  toggleSide() {
    this.updateSide = !this.updateSide;
  }

  toggleStatus() {
    this.updateStatus = !this.updateStatus;
  }

  toggleUpdateResume() {
    this.updateResume = !this.updateResume;
  }

  isCustomerEnabled(): boolean {
    return this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12;
  }

  isTechnicianEnabled(): boolean {
    return this.authService.getUserRole() === 2;
  }

  isManagerEnabled(): boolean {
    return this.authService.getUserRole() === 1;
  }

  submitForm() {
    this.loading = true;

    const user_uuid = this.cookieService.get('user_uuid');

    this.ticketsService.updateAskedPRFM(this.asked, this.asked.asked_uuid, user_uuid).subscribe(
      response => {
        this.openPopup();

        for (const prfs of this.prfssAdded) {

          const dataRelatedPrfsToPrfm = {
            asked_prfs_uuid: prfs.asked_uuid,
            asked_prfm_uuid: this.askedUuid,
            asked_prfs_ref: prfs.asked_ref,
            asked_prfm_ref: this.asked.asked_ref
          }

          this.addRelated(dataRelatedPrfsToPrfm);
        }
        
        for (const ship of this.shipsAdded) {

          const dataRelatedShipToPrfm = {
            asked_uuid: this.askedUuid,
            ship_uuid: ship.ship_uuid,
          }

          this.addRelatedShip(dataRelatedShipToPrfm);
        }

        if (this.askedUuid) {
          const user_uuid = this.cookieService.get('user_uuid');
          this.uploadFile(this.askedUuid, user_uuid);
        }
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 4000);
      },
      error => {
        console.error('Erreur:', error);
        this.loading = false;
      }
    );
  }

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid, 3).subscribe(
        (response) => {
          console.log('Files uploaded successfully', response);
        },
        (error) => {
          console.error('File upload failed', error);
        }
      );
    }
  }

  getFileNameWithoutExtension(fileName: string): string {
    const lastIndex = fileName.lastIndexOf('.');

    if (lastIndex !== -1) {
      const baseName = fileName.slice(0, lastIndex);
      const generatedFileName = baseName.slice(0, 4).padEnd(4, '0');
      return generatedFileName;
    } else {
      return fileName.slice(0, 4).padEnd(4, '0');
    }
  }

  openPopup() {
    this.isVisible = true;
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }

  downloadFile(filename: string) {
    const pathSegments = filename.split('/');

    const fileName = pathSegments[pathSegments.length - 1];

    this.ticketsService.downloadAttachement(fileName).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  clickDeleteFile() {
    this.deleteFile(this.attachementToDelete.attachment_id);
    this.isDeleteFileTicketVisible = !this.isDeleteFileTicketVisible;
  }

  clickDeleteFileToDownload() {
    this.deleteFiles(this.fileToDelete.name);
    this.isDeleteFileToDownloadTicketVisible = !this.isDeleteFileToDownloadTicketVisible;
  }

  cancelDeleteFile () {
    this.attachementToDelete = null;
    this.isDeleteFileTicketVisible = !this.isDeleteFileTicketVisible;
  }

  cancelDeleteFileToDownload () {
    this.fileToDelete = null;
    this.isDeleteFileToDownloadTicketVisible = !this.isDeleteFileToDownloadTicketVisible;
  }

  toggleDeleteFileTicket(att: any) {
    this.attachementToDelete = att;
    this.isDeleteFileTicketVisible = !this.isDeleteFileTicketVisible;
  }

  deleteFiles(fileName: string) {
    const index = this.files.findIndex(file => file.name === fileName);
    if (index !== -1) {
      this.files.splice(index, 1);
      console.log(`File ${fileName} deleted`);
    } else {
      console.log(`File ${fileName} not found`);
    }
  }

  deleteFile(attachementId: string) {
    if ( this.askedUuid ) {
      this.ticketsService.removeAttachement(attachementId).subscribe(
        data => {
          this.getAttachements();

        },
        error => {
          console.error('Erreur lors de la récupération des types d\'effet:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  DeletePrfsRelated(asked_prfs_uuid: string, asked_prfm_uuid: string) {
    const data = {
      asked_prfs_uuid: asked_prfs_uuid,
      asked_prfm_uuid: asked_prfm_uuid
    }

    this.ticketsService.deletePrfsRelatedToPrfm(data).subscribe(
      data => {
        this.fetchRelatedPrfs(asked_prfm_uuid);
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  DeleteShipRelated(asked_uuid: string, ship_uuid: string) {
    const data = {
      asked_uuid,
      ship_uuid
    }

    this.ticketsService.deleteShipRelatedToPrfm(data).subscribe(
      data => {
        this.fetchRelatedShips(asked_uuid);
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  cancel() {
    if (this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12) {
      this.router.navigate(['/client']);
    } else {
      this.router.navigate(['/']);
    }
  }

  addRelated (data: any) {
    this.ticketsService.related(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  addRelatedShip (data: any) {
    this.ticketsService.relatedShip(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

}
