import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  currentPage: number = 1;
  isLoading = true;
  tickets: any[] = [];
  sortOption: string = '';
  showFilter = false;
  showExport = false;
  customers: any[] = [];
  status: any[] = [];
  client: string = '';
  searchDescription: string = ''; 
  selectedOptionSort: string = 'desc';
  count: number = 0;
  typeFilter: string = '';
  skill: string = '';
  side: string = '';
  effectType: string = '';
  level: string = '';
  effect: string = '';
  tag: string = '';
  statusFilter: number = 0;
  exportType: string = '';
  pageSize: number = 20; 
  
  constructor(
    private ticketsService: TicketsService,
    private authService: AuthService,
    private sharedTitleService: SharedTitleService,
    private cookieService: CookieService,
    private infosService: InfosService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadSortOptionsFromCookies();
    this.client = this.cookieService.get('user_uuid');
    this.fetchTickets();
    this.sharedTitleService.changeTitle('ONBOARDING');
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
    if (this.authService.getUserRole() === 10) {
      this.customerService.getFleetByUser(this.cookieService.get('user_uuid')).subscribe(
        data => {
          data.forEach((fleet: any) => {
            this.ticketsService.getAskedDataClientFleet(this.currentPage, this.searchDescription, 1, this.sortOption, this.typeFilter, this.statusFilter, fleet.fleet_id, this.selectedOptionSort, this.pageSize).subscribe(
              (data) => {
                // Ajoute un champ 'showDetails' à chaque ticket pour gérer l'affichage des détails
                data.askedsList.forEach((ticket: any) => {
                  ticket.showDetails = false;
                });
                this.tickets = data.askedsList;
                this.count = data.count;
                this.isLoading = false;
              },
              (error) => {
                this.isLoading = false;
                alert(error.error.message);
                console.error('Erreur:', error);
              }
            );
          });
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.ticketsService.getAskedDataClient(
        this.currentPage, 
        this.searchDescription, 
        1, 
        this.sortOption, 
        this.typeFilter, 
        this.statusFilter, 
        this.client, 
        this.selectedOptionSort, 
        this.pageSize,
        this.skill,
        this.side,
        this.effectType,
        this.level,
        this.effect,
        this.tag
      ).subscribe(
        (data) => {
          // Ajoute un champ 'showDetails' à chaque ticket pour gérer l'affichage des détails
          data.askedsList.forEach((ticket: any) => {
            ticket.showDetails = false;
          });
          this.tickets = data.askedsList;
          this.count = data.count;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          alert(error.error.message);
          console.error('Erreur:', error);
        }
      );
    }
  }

  search() {
    this.isLoading = true;
    this.fetchTickets();
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

  // Méthode pour basculer l'affichage des détails d'un ticket
  toggleDetails(ticket: any): void {
    ticket.showDetails = !ticket.showDetails;
  }
}
