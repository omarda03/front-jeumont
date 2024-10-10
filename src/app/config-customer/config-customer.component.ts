import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-config-customer',
  templateUrl: './config-customer.component.html',
  styleUrls: ['./config-customer.component.scss']
})
export class ConfigCustomerComponent implements OnInit {
  form!: FormGroup; 
  ships: any[] = [];
  customers: any[] = [];
  fleets: any[] = [];
  idCustomer: string = ''; 
  idFleet: number = 0; 
  uuidShip: string = '';
  nameShip!: string;
  descShip!: string;
  nameFleet!: string;
  descFleet!: string;
  isCreationShipVisible:  boolean = false;  
  isCreationFleetVisible: boolean = false;
  isUpdateShipVisible:    boolean = false;  
  isUpdateFleetVisible:   boolean = false;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private infosService: InfosService, 
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customer_name: [''],
      customer_description: [''],
      customer_siret: ['']
    });
    this.fetchShips();
    this.fetchFleets();
    this.fetchCustomers();
  }

  private fetchShips(): void {
    this.infosService.getShips().subscribe(
      data => {
        this.ships = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchShipsByFleet(fleetid: number): void {
    this.infosService.getShipsByFleet(fleetid).subscribe(
      data => {
        this.ships = data;
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
  
  private fetchFleets(): void {
    this.infosService.getFleets().subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchFleetsByCustomer(cutomerUuid: string): void {
    this.infosService.getFleetsByCustomer(cutomerUuid).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  toggleCreationShip() {
    if ( this.idFleet !== 0 ){
      this.isCreationShipVisible = !this.isCreationShipVisible;
    }
  }

  toggleCreationFleet() {
    if ( this.idCustomer !== '' ){
      this.isCreationFleetVisible = !this.isCreationFleetVisible;
    }
  }

  toggleUpdateShip() {
    if ( this.uuidShip !== '' ) {
      this.isUpdateShipVisible = !this.isUpdateShipVisible;
    }
  }

  toggleUpdateFleet() {
    if ( this.idFleet !== 0 ){
      this.isUpdateFleetVisible = !this.isUpdateFleetVisible;
    }
  }

  onSubmit () {
    const formData = this.form.value;

    this.customerService.createCustomer(formData).subscribe(
      response => {
        console.log('Successfully:', response);
        this.form.reset();
        this.fetchCustomers();
        this.isError = false;
        this.text = `Customer has been successfully created!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while creating the customer!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );

  }  

  selectCustomer(customerUuid: string) {
    this.idCustomer = customerUuid;

    if (customerUuid === '') {
      this.fetchFleets();
    } else {
      this.fetchFleetsByCustomer(customerUuid);
    } 
  }

  selectFleet(fleetId: number, nameFleet: string, descFleet: string) {
    this.idFleet = fleetId;
    this.nameFleet = nameFleet;
    this.descFleet = descFleet;
    if (fleetId === 0) {
      this.fetchShips();
    } else {
      this.fetchShipsByFleet(fleetId);
    } 
  }

  selectShip(shipUuid: string, nameShip: string, descShip: string ){
    this.uuidShip = shipUuid;
    this.nameShip = nameShip;
    this.descShip = descShip;
  }

  createNewShip() {
    const data = { ship_name: this.nameShip, fleet_id: this.idFleet }    

    this.infosService.createShip(data).subscribe(
      response => {
        this.isCreationShipVisible = !this.isCreationShipVisible;
        this.nameShip= '';
        this.idCustomer='';
        this.uuidShip = '' ;
        this.idFleet = 0;
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
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

  createNewFleet() {
    const data = { fleet_name: this.nameFleet, fleet_description: this.descFleet, customer_uuid: this.idCustomer };    

    this.infosService.createFleet(data).subscribe(
      response => {
        this.isCreationFleetVisible = !this.isCreationFleetVisible;
        this.nameFleet= '';
        this.descFleet= '';        
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer= '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
        this.isError = false;
        this.text = `Fleet has been successfully created!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while creating the fleet!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );
  }

  updateFleet() {
    const data = { fleet_name: this.nameFleet, fleet_description: this.descFleet };

    this.infosService.updateFleet(data, this.idFleet).subscribe(
      response => {
        this.isUpdateFleetVisible = !this.isUpdateFleetVisible;
        this.nameFleet= '';
        this.descFleet= '';        
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer = '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
        this.isError = false;
        this.text = `Fleet has been successfully updated!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while updating the fleet!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );
  }

  updateShip() {
    const data = { ship_name: this.nameShip, ship_description: this.descShip };

    this.infosService.updateShip(data, this.uuidShip).subscribe(
      response => {
        this.isUpdateShipVisible = !this.isUpdateShipVisible;
        this.nameShip= '';
        this.descShip= '';
        this.uuidShip = '' ;
        this.idFleet = 0;
        this.idCustomer = '';
        
        this.fetchShips();
        this.fetchFleets();
        this.fetchCustomers();
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
  }
}
