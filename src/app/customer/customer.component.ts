import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { SharedTitleService } from '../services/shared-title.service';
import { CookieService } from 'ngx-cookie-service';
import { InfosService } from '../services/infos.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  text='Documents related to client'
  customerUuid!: string | null;
  customer: any;
  fleets: any[] = [];
  ships: any[] = [];
  documents: any[] = [];
  messages: any[] = [];
  isLoading: boolean = true;
  shipName: string = '';
  shipDescription: string = '';
  user_uuid: string = '';
  ship_uuid: string = '';
  currentPage: number = 1;
  currentPageMessage: number = 1;
  count: number = 0;
  countMessage: number = 0;
  pageSize: number = 10;
  pageSizeMessage: number = 10;

  constructor(
    private route: ActivatedRoute,
    private infosService: InfosService,
    private customerService: CustomerService,
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.user_uuid = this.cookieService.get('user_uuid');
    this.sharedTitleService.changeTitle('CLIENT INFORMATIONS');
    this.route.paramMap.subscribe(params => {
      this.customerUuid = params.get('customer_uuid');
      if (this.customerUuid) {
        this.fetchCustomerData();
      }
    });
    this.fetchDocuments(this.currentPage, this.pageSize);
    this.fetchMessagesClient(this.currentPageMessage, this.pageSizeMessage);
  }

  setText(text: string) {
    this.text = text;
  }

  get totalPagesMessage() {
    return Math.ceil(this.countMessage / this.pageSizeMessage);
  }

  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  fetchCustomerData(): void {
    if (this.customerUuid !== null) {
      this.customerService.getCustomerById(this.customerUuid).subscribe(
        data => {
          this.customer = data;
          this.fetchCustomerFleets();
          this.fetchCustomerShips();
          this.isLoading = false;
        },
        error => {
          console.error('Error:', error);
          this.isLoading = false ;
        }
      );
    }
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

  goToPage(pageNumber: any): void {
    const parsedPageNumber = parseInt(pageNumber, 10);
    if (!isNaN(parsedPageNumber)) {
      this.currentPage = Math.max(1, Math.min(parsedPageNumber, this.totalPages));
          
      this.fetchMessagesClient(this.currentPage, this.pageSize);
    }
  }

  goToPageMessage(pageNumber: any): void {
    const parsedPageNumber = parseInt(pageNumber, 10);
    if (!isNaN(parsedPageNumber)) {
      this.currentPageMessage = Math.max(1, Math.min(parsedPageNumber, this.totalPagesMessage));
          
      this.fetchMessagesClient(this.currentPageMessage, this.pageSizeMessage);
    }
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

  fetchCustomerFleets(): void {
    this.customerService.getFleetByCustomer(this.customerUuid!).subscribe(
      data => {
        this.fleets = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  fetchCustomerShips(): void {
    this.customerService.getShipByCustomer(this.customerUuid!).subscribe(
      data => {
        data.forEach((ship: any) => {
          if (ship.user_uuid = this.user_uuid) {
            this.ships.push(ship);
          }
        });
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  shipDesc(ship: any) {
    this.ship_uuid = ship.ship_uuid; 
    this.shipName = ship.ship_name;
    this.shipDescription = ship.ship_description;
    this.fetchMessagesClient(this.currentPageMessage, this.pageSizeMessage);
    this.fetchDocuments(this.currentPage, this.pageSize);
  }
}
