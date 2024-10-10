import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { TagsService } from '../services/tags.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { OnCallService } from '../services/on-call.service';
import { UsersService } from '../services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-prfs',
  templateUrl: './update-prfs.component.html',
  styleUrls: ['./update-prfs.component.scss']
})

export class UpdatePrfsComponent implements OnInit {
  errorMessage!: string;
  isLoadingPage: boolean = true;
  addUserOnCharge: boolean = false;
  selectedFiles: File[] = [];
  text: string  = 'Your ticket has been successfully modified.';
  askedUuid!: string | null;
  asked: any;
  prfs_asked_uuid: string = "";
  prfss: any[] = [];
  newMessage: string = '';
  updateDescription: boolean = false;
  updateAnalysis: boolean = false;
  updateActionTaken: boolean = false;
  updateRootCause: boolean = false;
  updateType: boolean = false;
  updateSide: boolean = false;
  updateStatus: boolean = false;
  updateTypeEffect: boolean = false;
  updateIncidentReport: boolean = false;
  updateCustomerComplaint: boolean = false;
  updateLevel: boolean = false;
  effectTypes: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  levels: any[] = [];
  effects: any[] = [];
  tags: any[] = [];
  allStatus: any[] = [];
  onCallsWeek: any[] = [];
  isVisible: boolean = false;
  conversation: any;
  effectsAsked: any[] = [];
  tagsAsked: any[] = [];
  attachements: any[] = [];
  effect_id: number = 0;
  tag_id: number = 0;
  userEmail: string = '';
  askedLogByAsked: any[] = [];
  isDeleteFileTicketVisible: boolean = false;
  isDeleteFileToDownloadTicketVisible: boolean = false;
  isBrowsefiles: boolean = false;
  attachementToDelete: any;
  fileToDelete: any;
  prfssAdded: any[] = [];
  loading: boolean = false;
  prfssAsked: any[] = [];
  userMail: string = '';
  isHoveredButton:boolean = false;
  suggestions: any[] = [];
  userId: string = '';

  files: any[] = [];
  maxFileCount: number = 10;

  @ViewChildren('messageDiv') messageDivs!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private infosService: InfosService,
    private ticketsService: TicketsService,
    private tagsService: TagsService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
    private onCallService: OnCallService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.sharedTitleService.changeTitle("Update PRFS");
    this.route.paramMap.subscribe(params => {
      this.askedUuid = params.get('asked_uuid');
      if (this.askedUuid) {
        this.getAskedLogs(this.askedUuid);
        this.fetchEffectsByAsked();
        this.fetchAskedTags();
        this.fetchAskedData();
        this.getAttachements();
        this.fetchRelatedPrfs(this.askedUuid);
        this.getOnCallNextWeek(this.askedUuid);
      }
    });
    this.fetchEffectTypes();
    this.fetchSides();
    this.fetchSkills();
    this.fetchLevels();
    this.fetchEffects();
    this.fetchTags();
    this.fetchStatus();
    this.fetchPRFS();

    setTimeout(() => {
      this.isLoadingPage = false;
    }, 2000);
  }
  
  validationCheck() {
    return this.asked.asked_description.length > 0 && this.asked.prfs_analyse.length > 0 && this.asked.prfs_root_cause.length > 0 && this.asked.prfs_action_taken.length > 0 ; 
  }

  toggleBrowsefiles() {
    this.isBrowsefiles = !this.isBrowsefiles;
  }

  getOnCallNextWeek (idAsked : string) {
    this.onCallService.findOnChangeId(idAsked).subscribe(
      data => {
        this.onCallsWeek = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  
  onInputChange() {
    this.searchUsers();
  }
  
  createAskedUser() {
    const data = { user_uuid: this.userId, asked_uuid: this.askedUuid };

    this.ticketsService.createAskedUser(data).subscribe(
      response => {
        this.addUserOnCharge = false;
        this.userId = '';
        if (this.askedUuid) {
          this.getOnCallNextWeek(this.askedUuid);
        }
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  selectSuggestionPrim(suggestion: string, user_uuid: string) {
    this.userId = user_uuid
    this.userEmail = suggestion;
    this.suggestions = [];
  }

  searchUsers() {
    this.usersService.findUsersTech(this.userEmail).subscribe(
      (data) => {
        this.suggestions = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  toggleAddUserOnCall() { this.addUserOnCharge = !this.addUserOnCharge }

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

  fetchRelatedPrfs(asked_id :string) {
    this.ticketsService.getPrfsRelatedPrfs(asked_id).subscribe(
      (data) => {
        console.log(data, 'asked prfs');
        this.prfssAsked = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3
  }

  removeAsked(index: number) {
    this.prfssAdded.splice(index, 1);
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

  addAskedToTable() {
    if (this.prfs_asked_uuid && this.askedUuid && !this.prfssAdded.includes(this.prfs_asked_uuid)) {
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

  DeletePrfsRelated(parent_asked_uuid: string, child_asked_uuid: string) {
    const data = {
      parent_asked_uuid,
      child_asked_uuid
    }

    this.ticketsService.deletePrfsRelatedToPrfs(data).subscribe(
      data => {
        this.fetchRelatedPrfs(parent_asked_uuid);
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  private getAskedLogs (id: string) {
    if (this.authService.getUserRole() == 1 || this.authService.getUserRole() == 2 || this.authService.getUserRole() == 3 || this.authService.getUserRole() == 4) {
      this.infosService.getLogAsked(id).subscribe(
        data => {
          console.log('asked log', data);
          this.askedLogByAsked = data;
        },
        error => {
          console.error('Erreur lors de la récupération des on calls:', error);
        }
      );
    } else {
      this.infosService.getLogAskedUser(id, this.cookieService.get('user_uuid')).subscribe(
        data => {
          console.log('asked log', data);
          this.askedLogByAsked = data;
        },
        error => {
          console.error('Erreur lors de la récupération des on calls:', error);
        }
      );
    }
  }

  private fetchEffectTypes(): void {
    this.infosService.getEffectTypes().subscribe(
      data => {
        this.effectTypes = data;
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  private fetchTags(): void {
    this.tagsService.getTags().subscribe(
      data => {
        this.tags = data;
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  private fetchAskedTags(): void {
    if (this.askedUuid !== null) {
      this.infosService.getTagsByAsked(this.askedUuid).subscribe(
        data => {
          this.tagsAsked = data;
        },
        error => {
          console.error('Erreur lors de la récupération des types d\'effet:', error);
        }
      );
    }
  }

  toggleDeleteFileTicket(att: any) {
    this.attachementToDelete = att;
    this.isDeleteFileTicketVisible = !this.isDeleteFileTicketVisible;
  }

  toggleDeleteFileToDownloadTicket(att: any) {
    this.fileToDelete = att;
    this.isDeleteFileToDownloadTicketVisible = !this.isDeleteFileToDownloadTicketVisible;
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

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid, 1).subscribe(
        (response) => {
          console.log('Files uploaded successfully', response);
        },
        (error) => {
          console.error('File upload failed', error);
        }
      );
    }
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

  private fetchSkills(): void {
    this.infosService.getSkills().subscribe(
      data => {
        this.skills = data;
      },
      error => {
        console.error('Erreur lors de la récupération des compétences:', error);
      }
    );
  }

  private fetchLevels(): void {
    this.infosService.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    );
  }

  fetchEffectsByAsked(): void {
    if (this.askedUuid !== null) {
      this.infosService.getEffectsByAsked(this.askedUuid).subscribe(
        data => {
          this.effectsAsked = data;
        },
        error => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  fetchAskedData(): void {
    if (this.askedUuid !== null) {
      this.ticketsService.getOneAskedPRFSData(this.askedUuid).subscribe(
        data => {
          this.asked = data;
          this.sharedTitleService.changeTitle(data.asked_ref);
        },
        error => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  submitForm() {
    this.loading = true;
    const user_uuid = this.cookieService.get('user_uuid');

    // if (this.asked.prfs_action_taken.length < 32) {
    //   this.loading = false;
    //   this.errorMessage = "The length of the action taken is less than 32 characters, please verify.";
    //   setTimeout(() => { this.errorMessage = ''; }, 5000);
    // } else {
    this.ticketsService.updateAskedPRFS(this.asked, this.asked.asked_uuid, user_uuid).subscribe(
      response => {
        this.loading = false;
        this.openPopup();

        if (this.askedUuid) {
          const user_uuid = this.cookieService.get('user_uuid');
          this.uploadFile(this.askedUuid, user_uuid);
        }

        setTimeout(() => {
          this.location.back();
        }, 4000);
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error.message;
        setTimeout(() => { this.errorMessage = '' }, 5000);
      }
    );
    // }
  }

  disableAskedWhereClose() {
    return this.asked.status_id !== 6
  }

  toggleUpdateDescription() {
    this.updateDescription = !this.updateDescription;
  }

  toggleCustomerComplaint() {
    this.updateCustomerComplaint = !this.updateCustomerComplaint;
  }

  toggleStatus() {
    this.updateStatus = !this.updateStatus;
  }

  toggleIncidentReport() {
    this.updateIncidentReport = !this.updateIncidentReport;
  }

  toggleUpdateAnalysis() {
    this.updateAnalysis = !this.updateAnalysis;
  }

  toggleUpdateRootCause() {
    this.updateRootCause = !this.updateRootCause;
  }

  toggleActionTaken() {
    this.updateActionTaken = !this.updateActionTaken;
  }

  toggleType() {
    this.updateType = !this.updateType;
  }

  toggleSide() {
    this.updateSide = !this.updateSide;
  }

  toggleTypeEffect() {
    this.updateTypeEffect = !this.updateTypeEffect;
  }

  toggleLevel() {
    this.updateLevel = !this.updateLevel;
  }

  isImage(fileName: string): boolean {
    const imageExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'svg', 'webp', 'raw', 'ico', 'heic', 'heif', 'psd', 'ai'];
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (fileExtension !== undefined) {
      return imageExtensions.includes(fileExtension);
    }

    return false;
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
    console.log(files);
    for (const file of files) {
      this.files.push({ name: file.name, size: this.formatFileSize(file.size) });
    }
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024);
    return megabytes.toFixed(2) + ' Mo';
  }


  getFileNameWithoutExtension(fileName: string): string {
    const lastIndex = fileName.lastIndexOf('.');

    if (lastIndex !== -1) {
      const baseName = fileName.slice(0, lastIndex);
      return baseName;
    } else {
      return fileName.slice(0, 4).padEnd(4, '0');
    }
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

  openPopup() {
    this.isVisible = true;
  }

  addTagToAsked() {
    if (this.tag_id && this.askedUuid ) {
      const user_uuid = this.cookieService.get('user_uuid');

      const data = {
        user_uuid,
        asked_uuid: this.askedUuid,
        tag_id: this.tag_id
      }

      this.ticketsService.askedAddTag(data).subscribe(
        response => {
          console.log(response);
          this.fetchAskedTags();
          this.tag_id = 0;
        },
        error => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  DeleteTagToAsked(tag_id : number) {
    if (tag_id && this.askedUuid ) {
      const user_uuid = this.cookieService.get('user_uuid');

      this.ticketsService.askedDeleteTag(tag_id, this.askedUuid, user_uuid).subscribe(
        response => {
          this.fetchAskedTags();
        },
        error => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  addEventToAsked() {
    if (this.effect_id && this.askedUuid ) {
      const user_uuid = this.cookieService.get('user_uuid');

      const data = {
        asked_uuid: this.askedUuid,
        effect_id: this.effect_id,
        user_uuid
      }

      this.ticketsService.askedAddEvent(data).subscribe(
        response => {
          console.log(response);
          this.fetchEffectsByAsked();
          this.effect_id = 0;
        },
        error => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  DeleteEventToAsked(effect_id : number) {
    if (effect_id && this.askedUuid ) {
      const user_uuid = this.cookieService.get('user_uuid');

      this.ticketsService.askedDeleteEvent(effect_id, this.askedUuid, user_uuid).subscribe(
        response => {
          this.fetchEffectsByAsked();
        },
        error => {
          console.error('Error creating Conversation:', error);
        }
      );
    } else {
      console.log('rrrr');
    }
  }

  cancel() {
    if (this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12) {
      this.router.navigate(['/client']);
    } else {
      this.router.navigate(['/']);
    }
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }
}

