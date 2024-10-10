import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';


@Component({
  selector: 'app-config-ships',
  templateUrl: './config-ships.component.html',
  styleUrls: ['./config-ships.component.scss']
})
export class ConfigShipsComponent {
  form!: FormGroup;
  formCheck!: FormGroup;
  fleets: any[] = [];
  ships: any[] = [];
  users: any[] = [];
  selectedShip: any = null;
  isDeleteShipVisible: boolean = false;
  user_uuid!: string;
  user_uuid_delete!: string;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService, 
    private infosService: InfosService
  ) {}
  
  ngOnInit () {
    this.formCheck = this.fb.group({ user_email: [''] });

    this.form = this.fb.group({
      ship_name: [''],
      fleet_id: 0,
      ship_description: [''],
      user_uuid: ['']
    });

    this.fetchShips();
    this.fetchFleets();
    this.fetchUsers();
  }

  private fetchUsers() {
    this.usersService.findUsers('').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchFleets() {
    this.infosService.getFleets().subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
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

  updateFormValues() {
    
    if (this.selectedShip == null) {
      this.form.patchValue({
        ship_name: '',
        fleet_id: 0,
        ship_description: '',
        user_uuid: ''
      });
    }

    this.form.patchValue({
      ship_name: this.selectedShip.ship_name,
      fleet_id: this.selectedShip.fleet_id,
      ship_description: this.selectedShip.ship_description,
      user_uuid: this.selectedShip.user_uuid
    });

  }

  submitFormShip () {
    const formData = this.form.value;

    if (this.selectedShip) {
      this.infosService.updateShip(formData, this.selectedShip.ship_uuid).subscribe(
        response => {
          console.log('Updated:', response);

          this.form = this.fb.group({
            ship_name: [''],
            fleet_id: 0,
            ship_description: [''],
            user_uuid: ['']
          });

          this.selectedShip = null;

          this.fetchShips();
          this.isError = false;
          this.text = `Ship has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating the ship!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    } else {
      this.infosService.createShip(formData).subscribe(
        response => {
          console.log('Created:', response);
          this.form = this.fb.group({
            ship_name: [''],
            fleet_id: 0,
            ship_description: [''],
            user_uuid: ['']
          });

          this.fetchShips();
          this.isError = false;
          this.text = `Ship has been successfully created!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while creating the ship!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }

  cancelCreationShip () {
    this.form = this.fb.group({
      ship_name: [''],
      fleet_id: 0,
      ship_description: [''],
      user_uuid: ['']
    });
    this.selectedShip = '';
  }

  toggleDeleteShip () {
    this.isDeleteShipVisible = !this.isDeleteShipVisible;
  }

  deleteShip () {
    if ( this.selectedShip ) {
      this.infosService.deleteShip(this.selectedShip.ship_uuid).subscribe(
        response => {
          console.log('Successfully:', response);
          this.form = this.fb.group({
            ship_name: [''],
            fleet_id: 0,
            ship_description: [''],
            user_uuid: ['']
          });

          this.selectedShip = null;
          this.fetchShips();
          this.isDeleteShipVisible = !this.isDeleteShipVisible;
          this.isError = false;
          this.text = `Ship has been successfully deleted!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while deleting the ship!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }  
  }

}

