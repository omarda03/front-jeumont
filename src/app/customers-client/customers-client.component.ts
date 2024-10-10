import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { CookieService } from 'ngx-cookie-service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { UsersService } from '../services/users.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers-client',
  templateUrl: './customers-client.component.html',
  styleUrls: ['./customers-client.component.scss']
})
export class CustomersClientComponent  implements OnInit {
  text='Documents related to client';
  searchForm!: FormGroup;
  isLoading = true; 
  ships: any[] = [];
  fleets: any[] = [];
  messages: any[] = [];
  user_uuid: string = '';
  documents: any[] = [];
  shipName: string = '';
  client: any;
  ship_uuid: string = '';
  shipDescription: string = '';
  currentPage: number = 1;
  currentPageMessage: number = 1;
  count: number = 0;
  countMessage: number = 0;
  pageSize: number = 10;
  pageSizeMessage: number = 10;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private infosService: InfosService,
    private customerService: CustomerService,    
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
    private messageService: MessageService
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''] 
    });
  }

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchClient');
    this.user_uuid = this.cookieService.get('user_uuid');
    this.fetchUserShips();
    this.fetchDocuments(this.currentPage, this.pageSize);
    this.findUserById();
  }

  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  

  getPageNumbers(currentPage: number, totalPages: number): any[] {
    const pageNumbers = [];
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftOffset = Math.floor(maxDisplayedPages / 2);
      let start = currentPage - leftOffset;
      let end = currentPage + leftOffset;

      if (start <= 0) {
        start = 1;
        end = maxDisplayedPages;
      }

      if (end > totalPages) {
        end = totalPages;
        start = end - maxDisplayedPages + 1;
      }

      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }

  goToPage(pageNumber: any): void {
    const parsedPageNumber = parseInt(pageNumber, 10);
    if (!isNaN(parsedPageNumber)) {
      this.currentPage = Math.max(1, Math.min(parsedPageNumber, this.totalPages));
          
      this.fetchDocuments(this.currentPage, this.pageSize);
    }
  }

  findUserById(): void {
    this.usersService.findUserById(this.user_uuid).subscribe(
      data => {
        this.client = data;
      },
      error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
  } 

  changePage(offset: number): void {
    this.isLoading = true;
    this.currentPage += offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.fetchDocuments(this.currentPage, this.pageSize);
  }

  fetchMessagesClient(
    page: number,
    pageSize: number
  ): void {
    this.messageService.findMessagesByClient(this.user_uuid, this.ship_uuid, page, pageSize).subscribe(
      data => {
        console.log(data);
        this.countMessage = data.count;
        this.messages = data.messages; 
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  setText(text: string) {
    this.text = text;
  }

  


  fetchDocuments(
    page: number,
    pageSize: number
  ): void {
    if (!this.ship_uuid) {
      this.infosService.getDocumentsByClient(this.user_uuid).subscribe(
        data => {
          this.documents = data; 
          this.isLoading = false;
        },
        error => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      );
    } else {
      this.infosService.getDocumentsByShip(this.ship_uuid, page, pageSize).subscribe(
        data => {
          this.count = data.count;
          this.documents = data.documentsInterne; 
          this.isLoading = false;
        },
        error => {
          console.error('Error:', error);
          if (error.status === 404) {
            this.documents = []
            this.count = 0;
          }
          this.isLoading = false;
        }
      );
    }
  }

  fetchUserShips(): void {
    if ( this.authService.getUserRole() === 10) {
      this.customerService.getFleetByUser(this.user_uuid).subscribe(
        data => {
          data.forEach((fleet:any) => {
            this.customerService.getShipByFleet(fleet.fleet_id).subscribe(
              data => {
                this.ships = data;
                data.forEach((ship:any) => {
                  const isFleetRepeated = this.fleets.some(fleet => fleet.fleet_id === ship.Fleet.fleet_id);
        
                  if (!isFleetRepeated) {
                    this.fleets.push(ship.Fleet);
                  }
                });
              },
              error => {
                console.error('Error:', error);
              }
            );
          });
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.customerService.getShipByUser(this.user_uuid).subscribe(
        data => {
          this.ships = data;
          data.forEach((ship:any) => {
            const isFleetRepeated = this.fleets.some(fleet => fleet.fleet_id === ship.Fleet.fleet_id);
  
            if (!isFleetRepeated) {
              this.fleets.push(ship.Fleet);
            }
          });
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }

  goToPageMessage(pageNumber: any): void {
    const parsedPageNumber = parseInt(pageNumber, 10);
    if (!isNaN(parsedPageNumber)) {
      this.currentPageMessage = Math.max(1, Math.min(parsedPageNumber, this.totalPagesMessage));
          
      this.fetchMessagesClient(this.currentPageMessage, this.pageSizeMessage);
    }
  }

  changePageMessage(offset: number): void {
    this.isLoading = true;
    this.currentPageMessage += offset;
    if (this.currentPageMessage < 1) {
      this.currentPageMessage = 1;
    } else if (this.currentPageMessage > this.totalPagesMessage) {
      this.currentPageMessage = this.totalPagesMessage;
    }

    this.fetchDocuments(this.currentPageMessage, this.pageSizeMessage);
  }

  shipDesc(ship: any) {
    this.ship_uuid = ship.ship_uuid; 
    this.shipName = ship.ship_name;
    this.shipDescription = ship.ship_description;
    this.fetchMessagesClient(this.currentPageMessage, this.pageSizeMessage);
    this.fetchDocuments(this.currentPage, this.pageSize);
  }

  get totalPagesMessage() {
    return Math.ceil(this.countMessage / this.pageSizeMessage);
  }

}