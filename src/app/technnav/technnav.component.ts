import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { SharedService } from '../services/shared.service';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-technnav',
  templateUrl: './technnav.component.html',
  styleUrls: ['./technnav.component.scss']
})
export class TechnnavComponent implements OnInit {
  currentPage: number = 1;
  isCreateTicketVisible$ = this.sharedService.isCreateTicketVisible$;
  isLoading = true;
  tickets: any[] = [];
  sortOption: string = '';
  showFilter = false;
  showExport = false;
  customers: any[] = [];
  status: any[] = [];


  client: string = '';
  ship: string = '';
  skill: string = '';
  side: string = '';
  effectType: string = '';
  level: string = '';
  effect: string = '';
  tag: string = '';
  searchDescription: string = ''; 
  selectedOptionSort: string = 'desc';
  count: number = 0;
  pageSize: number = 30;
  typeFilter: string = '';
  statusFilter: number = 0;
  exportType: string = '';
  startDate!: string ;
  endDate!: string ;

  constructor(
    private ticketsService: TicketsService,
    private sharedTitleService: SharedTitleService,
    private infosService: InfosService,
    private sharedService: SharedService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSortOptionsFromCookies();
    this.fetchTickets();
    this.sharedTitleService.changeTitle('ONBOARDING');
    this.fetchCustomers();
    this.fetchStatus();
  }

  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3
  }

  resetFilter() {
    this.isLoading = true;
    this.client= '';
    this.statusFilter= 0;
    this.typeFilter = '';
    this.fetchTickets();
  }

  fetchStatus() {
    this.infosService.getStatuses().subscribe(
      data => {
        this.status = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  toggleCreateTicket() {
    const currentVisibility = this.sharedService.getIsCreateTicketVisible();
    this.sharedService.setCreateTicketVisibility(!currentVisibility);
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

  loadSortOptionsFromCookies(): void {
    this.sortOption = this.cookieService.get('sortOption') || '';
    this.selectedOptionSort = this.cookieService.get('selectedOptionSort') || 'desc';
  }

  saveSortOptionsToCookies(): void {
    this.cookieService.set('sortOption', this.sortOption);
    this.cookieService.set('selectedOptionSort', this.selectedOptionSort);
  }

  sort(name: string) {
    this.sortOption = name;
    this.isLoading = true;
    this.currentPage = 1;
    this.tickets = [];
    this.saveSortOptionsToCookies();
    this.fetchTickets();
  }

  fetchTickets() {
    this.ticketsService.getAskedData(
      this.currentPage, 
      this.searchDescription, 
      1,
      this.sortOption, 
      this.typeFilter, 
      this.statusFilter, 
      this.client, 
      this.ship, 
      this.selectedOptionSort, 
      this.pageSize,  
      this.startDate,
      this.endDate,
      this.skill,
      this.side,
      this.effectType,
      this.level,
      this.effect,
      this.tag,
      ''
    ).subscribe(
      (data) => {
        this.tickets = data.askedsList;
        this.count = data.count;
        this.isLoading = false;
      },
      (error) => {
        if (error.status === 404) {
          this.tickets = [];
          this.isLoading = false;
          alert(error.error.message);
        }
        console.error('Erreur:', error);
      }
    );
  }

  onSortOptionChange() {
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
  }

  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  changePage(offset: number): void {
    this.isLoading = true;
    this.currentPage += offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.fetchTickets();
  }
}