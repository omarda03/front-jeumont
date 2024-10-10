import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InfosService } from '../services/infos.service';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create-prfs',
  templateUrl: './create-prfs.component.html',
  styleUrls: ['./create-prfs.component.scss']
})
export class CreatePrfsComponent implements OnInit {
  selectedFiles: File[] = [];
  form!: FormGroup;
  effectTypes: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  levels: any[] = [];
  statuses: any[] = [];
  ships: any[] = [];
  customers: any[] = [];
  fleets: any[] = [];
  effects: any[] = [];
  selectedCustomer: any | undefined;
  selectedFleet: any | undefined;
  attachments: Array<{ name: string, size: string }> = [];
  numberOfAttachments: number = 0;
  selectedOptionSupport: string = '';
  isBrowsefiles: boolean = false;
  text:string = 'Your ticket has been successfully created.';
  isVisible = false;
  prfsCreated!: any;
  effectsAdded: any[] = [];
  loading: boolean = false;
  prfssAdded: any[] = [];
  prfss: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private infosService: InfosService,
    private ticketsService: TicketsService,
    private sharedTitleService: SharedTitleService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('PRFS CREATION');
    this.form = this.fb.group({
      asked_description: new FormControl('', [Validators.required, Validators.minLength(32)]),
      customer_uuid: new FormControl('', [Validators.required]),
      fleet_id: new FormControl('', [Validators.required]),
      ship_uuid: new FormControl('', [Validators.required]),
      prfs_resume: new FormControl(''),
      prfs_analyse: new FormControl(''),
      prfs_root_cause: new FormControl(''),
      prfs_action_taken: new FormControl(''),
      Incident_report: new FormControl(''),
      asked_prfm: null,
      effect_type_id: 0,
      effect_id: 0,
      side_id: 0,
      skill_id: 0,
      level_id: new FormControl('', [Validators.required]),
      urgency: new FormControl(false),
      user_uuid: this.cookieService.get('user_uuid'),
      asked_uuid: new FormControl(''),
    });
    this.fetchEffectTypes();
    this.fetchSides();
    this.fetchSkills();
    this.fetchLevels();
    this.fetchCustomers();
    this.fetchEffects();
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

  toggleBrowsefiles() {
    this.isBrowsefiles = !this.isBrowsefiles;
  }

  get askedDescriptionControl() { return this.form.get('asked_description')! }
  get customerUuidControl() { return this.form.get('customer_uuid')! }
  get fleetIdControl() { return this.form.get('fleet_id')! }
  get shipUuidControl() { return this.form.get('ship_uuid')! }
  get levelIdControl() { return this.form.get('level_id')! }

  private fetchEffectTypes(): void {
    this.infosService.getEffectTypes().subscribe(
      data => {
        this.effectTypes = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  addAskedToTable() {
    const asked_uuid = this.form.get('asked_uuid');
    if (asked_uuid && !this.prfssAdded.includes(asked_uuid.value)) {
      this.ticketsService.getOneAskedPRFSData(asked_uuid.value).subscribe(
        response => {
          this.prfssAdded.push(response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );

      this.form.get('asked_uuid')?.setValue('');
    }
  }

  removeAsked(index: number) {
    this.prfssAdded.splice(index, 1);
  }

  private fetchSides(): void {
    this.infosService.getSides().subscribe(
      data => {
        this.sides = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchSkills(): void {
    this.infosService.getSkills().subscribe(
      data => {
        this.skills = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchLevels(): void {
    this.infosService.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => {
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

  uploadFile(askedUuid: string, userUuid: string) {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.ticketsService.uploadFile(formData, askedUuid, userUuid, 1).subscribe(
        (response) => {
          console.log('Successfully:', response);
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
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


  changeFleet(): void {
    const fleetIdControl = this.form.get('fleet_id');
    const ShipUuidControl = this.form.get('ship_uuid');

    if (fleetIdControl) {
      const fleetIdValue = fleetIdControl.value;
      this.fetchShipsByFleet(fleetIdValue);
    }

    if (ShipUuidControl) { ShipUuidControl.setValue('') }
  }

  getColorRGB(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return r + ',' + g + ',' + b;
  }

  submitForm() {
    this.loading = true;
    const formData = this.form.value;

    if (this.form.valid) {
      this.ticketsService.createAskedPRFS(formData).subscribe(
        response => {
          this.text = `Your ticket #${response.prfs.asked_ref} has been successfully created.`;
          this.openPopup();

          for (const prfs of this.prfssAdded) {
  
            const dataRelatedPrfsToPrfs = {
              parent_asked_uuid: response.prfs.asked_uuid,
              child_asked_uuid: prfs.asked_uuid
            }

            this.addRelatedPrfs(dataRelatedPrfsToPrfs);
          }

          for (const item of this.effectsAdded) {
            const dataToEvent = {
              effect_id: Number(item.effect_id),
              asked_uuid: response.prfs.asked_uuid
            }

            this.addEventToAsked(dataToEvent);
          }

          const user_uuid = this.cookieService.get('user_uuid');

          this.uploadFile(response.prfs.asked_uuid, user_uuid);

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

  cancel() {
    this.form = this.fb.group({
      asked_description: [''],
      customer_uuid: [''],
      fleet_id: [''],
      ship_uuid: [''],
      prfs_resume: [''],
      prfs_analyse: [''],
      prfs_root_cause: [''],
      prfs_action_taken: [''],
      asked_prfm: null,
      effect_type_id: 0,
      effect_id: 0,
      side_id: 0,
      skill_id: 0,
      level_id: 0
    });

    this.router.navigate(['/']);
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

  openPopup() {
    this.isVisible = true;
  }

  addEffectToTable() {
    const effectId = this.form.get('effect_id');
    if (effectId && !this.effectsAdded.includes(effectId.value)) {
      this.infosService.getEffectById(effectId.value).subscribe(
        response => {
          this.effectsAdded.push(response);
        },
        error => {
          console.error('Erreur:', error);
        }
      );

      this.form.get('effect_id')?.setValue(0);
    }
  }

  removeEffect(index: number) {
    this.effectsAdded.splice(index, 1);
  }

  addEventToAsked (data: any) {
    this.ticketsService.askedAddEvent(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  addRelatedPrfs (data: any) {
    this.ticketsService.relatedPrfs(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }
}
