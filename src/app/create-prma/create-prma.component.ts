import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { InfosService } from '../services/infos.service';
import { SharedTitleService } from '../services/shared-title.service';
import { Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-prma',
  templateUrl: './create-prma.component.html',
  styleUrls: ['./create-prma.component.scss']
})

export class CreatePrmaComponent implements OnInit {
  errorMessage!: string;
  selectedFiles: File[] = [];
  loading: boolean = false;
  form!: FormGroup;
  selectedOptionSupport: string = '';
  customers: any[] = [];
  fleets: any[] = [];
  ships: any[] = [];
  pieces: any[] = [];
  projects: any[] = [];
  equipementsinterne: any[] = [];
  attachments: Array<{ name: string, size: string }> = [];
  numberOfAttachments: number = 0;
  isBrowsefiles: boolean = false;
  text:string = 'Your ticket has been successfully created.';
  isVisible = false;
  // tables spare parts
  spare_parts: any[] = [];

  // value spare
  piece_uuid: string = "";
  piece: any;
  quantity: number = 0;
  purchase_order_number!: string;
  expected_date!: Date;
  status_ifs!: string;
  prfss: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ticketsService: TicketsService,
    private cookieService: CookieService,
    private infosService: InfosService,
    private sharedTitleService: SharedTitleService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('PRMA CREATION');
    this.form = this.fb.group({
      asked_description: new FormControl('', [Validators.required, Validators.minLength(1)]),
      customer_uuid: new FormControl('', [Validators.required]),
      fleet_id: new FormControl('', [Validators.required]),
      ship_uuid: new FormControl('', [Validators.required]),
      prma_id_crm: '',
      prma_date: new Date(),
      prma_project_number: new FormControl(''),
      prma_purchase_order_po: '',
      prma_quotation_price_total: 0,
      prma_date_estimated_of_receipt: new Date(),
      prma_number_da: new FormControl(''),
      prfs_link:  new FormControl(''),
      prma_release_date_da: new Date(),
      user_uuid: this.cookieService.get('user_uuid')
    });
    this.fetchProjects();
    this.fetchPieces();
    this.fetchCustomers();
    this.fetchEquipementInterne();
    this.fetchPRFS();
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

  get customerUuidControl() { return this.form.get('customer_uuid')! }
  get fleetIdControl() { return this.form.get('fleet_id')! }
  get shipUuidControl() { return this.form.get('ship_uuid')! }

  private fetchEquipementInterne() {
    this.infosService.getEquipementsinterne().subscribe(
      data => {
        this.equipementsinterne = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }
  
  toggleBrowsefiles() {
    this.isBrowsefiles = !this.isBrowsefiles;
  }

  private fetchProjects() {
    this.infosService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchPieces() {
    this.infosService.getPieces().subscribe(
      data => {
        this.pieces = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  deleteSparePart(index: number): void {
    this.spare_parts.splice(index, 1);
  }

  addToSpareParts() {
    this.infosService.findEquipementInterneById(this.piece_uuid).subscribe(
      data => {
        this.piece = data;

        this.spare_parts.push({
          'piece': this.piece,
          'quantity': this.quantity,
          'purchase_order_number': this.purchase_order_number,
          'expected_date': this.expected_date,
          'status_ifs': this.status_ifs
        })

        this.piece_uuid = ""
        this.piece= null;
        this.quantity= 0;
        this.purchase_order_number= "";
        this.expected_date= new Date();
        this.status_ifs= "";
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  isCreationEnabled(): boolean {
    return this.authService.getUserRole() === 1 || this.authService.getUserRole() === 3;
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

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  openPopup() {
    this.isVisible = true;
  }

  handleFiles(files: File[]) {
    for (const file of files) {
      this.attachments.push({ name: file.name, size: this.formatFileSize(file.size) });
    }
    this.numberOfAttachments = this.attachments.length;
  }

  formatFileSize(size: number): string {
    const megabytes = size / (1024 * 1024);
    return megabytes.toFixed(2) + ' Mo';
  }

  changeUser(): void {
    const customerUuidControl = this.form.get('customer_uuid');
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');

    if (customerUuidControl) {
      const customerUuidValue = customerUuidControl.value;
      this.fetchFleetsByCustomer(customerUuidValue);
    }

    if (fleetIdControl) { fleetIdControl.setValue('') }
    if (ShipUuidControl) { ShipUuidControl.setValue('') }
  }

  get askedDescriptionControl() { return this.form.get('asked_description')! }

  changeFleet(): void {
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');

    if (fleetIdControl) {
      const fleetIdValue = fleetIdControl.value;
      this.fetchShipsByFleet(fleetIdValue);
    }

    if (ShipUuidControl) { ShipUuidControl.setValue('') }
  }

  private fetchFleetsByCustomer(customer_uuid: string): void {
    this.infosService.getFleetsByCustomer(customer_uuid).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchShipsByFleet(fleet_id: number): void {
    this.infosService.getShipsByFleet(fleet_id).subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  submitForm() {
    this.loading = true;
    const formData = this.form.value;

    if (this.spare_parts.length === 0) {
      this.loading = false;
      this.errorMessage = "At a minimum, you need to add one spare part to the PRMA ticket.";
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    } else {
      if (this.form.valid) {
        this.ticketsService.createAskedPRMA(formData).subscribe(
          response => {
  
            this.text = `Your ticket #${response.prma.asked_ref} has been successfully created.`;
            this.openPopup();
  
            const user_uuid = this.cookieService.get('user_uuid');
  
            this.uploadFile(response.prma.asked_uuid, user_uuid);
  
            this.spare_parts.forEach((spare_parts) =>{
              this.ticketsService.createAskedPRMAEqpInternal(response.prma.asked_uuid, spare_parts).subscribe(
                response => {
                  console.log(response);
                },
                error => {
                  console.error('Erreur:', error);
                  this.loading = false;
                }
              );
            });
  
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000);
          },
          error => {
            console.error('Erreur:', error);
            this.loading = false;
          }
        );
      } else {
        this.form.markAllAsTouched();
        this.loading = false;
      }
    }
  }

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid, 2).subscribe(
        (response) => {
          console.log('Successfully:', response);
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }
}
