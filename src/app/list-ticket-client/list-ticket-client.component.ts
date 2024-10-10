import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { TagsService } from '../services/tags.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-list-ticket-client',
  templateUrl: './list-ticket-client.component.html',
  styleUrls: ['./list-ticket-client.component.scss']
})
export class ListTicketClientComponent implements OnInit {
  isfilter: boolean = false;
  page: number = 1;
  isLoading = true;
  tickets: any[] = [];
  askedDescription: string = '';
  sortOption: string = '';
  selectedOption: string | null = null;
  showFilter = false;
  showExport = false;
  customers: any[] = [];
  status: any[] = [];
  tags: any[] = [];
  effects: any[] = [];
  levels: any[] = [];
  effectTypes: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  skill: string = '';
  side: string = '';
  effectType: string = '';
  level: string = '';
  effect: string = '';
  tag: string = '';
  client: string = '';
  searchDescription: string = '';
  itemSize: number = 200;
  typeFilter: string = '';
  statusFilter: number = 0;
  searchDescriptionOption: number = 1;
  exportType: string = '';
  selectedOptionSort: string = 'desc';

  constructor(
    private usersService: UsersService,
    private ticketsService: TicketsService,
    private tagsService: TagsService,
    private sharedTitleService: SharedTitleService,
    private infosService: InfosService,
    private cookieService: CookieService,
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.client = this.cookieService.get('user_uuid');
    this.sharedTitleService.changeTitle('listingTickets');
    this.fetchTickets();
    this.fetchStatus();
    this.fetchTags();
    this.fetchEffects();
    this.fetchEffectTypes();
    this.fetchLevels();
    this.fetchSides();
    this.fetchSkills();
  }

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
    
  private fetchTags(): void {
    this.tagsService.getTags().subscribe(
      data => {
        this.tags = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  resetFilter() {
    this.isLoading = true;
    this.statusFilter= 0;
    this.typeFilter = '';
    this.skill = '';
    this.side = '';
    this.effectType = '';
    this.level = '';
    this.effect = '';
    this.tag = '';
    this.isfilter = false;
    this.fetchTickets();
    this.toggleFilter();
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

  applyTypeFilter(type: string) {
    this.isfilter = true;
    this.typeFilter = type;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyStatusFilter(status: number) {
    this.isfilter = true;
    this.statusFilter = status;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applySkillFilter(skill: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.skill = skill;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applySideFilter(side: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.side = side;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyEffectTypeFilter(effectType: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.effectType = effectType;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyLevelFilter(level: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.level = level;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }
  
  applyEffectFilter(effect: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 8;
    this.effect = effect;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  applyTagFilter(tag: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 7;
    this.tag = tag;
    this.isLoading = true;
    this.fetchTickets();
    this.toggleFilter();
  }

  fetchTickets() {
    if (this.authService.getUserRole() === 10) {
      this.customerService.getFleetByUser(this.cookieService.get('user_uuid')).subscribe(
        data => {
          data.forEach((fleet:any) => {
            this.ticketsService.getAskedDataClientFleet(
              this.page, 
              this.searchDescription, 
              this.searchDescriptionOption,
              this.sortOption, 
              this.typeFilter, 
              this.statusFilter, 
              fleet.fleet_id, 
              this.selectedOptionSort, 
              this.itemSize
            ).subscribe(
              (data) => {
                this.tickets = data.askedsList;
                this.isLoading = false;
              },
              (error) => {
                if (error.status === 404) {
                  this.tickets = [];
                  this.isLoading = false;
                  alert(error.error.message);
                }
                console.error('Erreur ticket:', error);
              }
            );
          });
        },
        error => {
          if (error.status === 404) {
            this.tickets = [];
            this.isLoading = false;
            alert(error.error.message);
          }
          console.error('Erreur ticket:', error);
        }
      );
    } else {
      this.ticketsService.getAskedDataClient(
        this.page, this.searchDescription, 
        this.searchDescriptionOption, 
        this.sortOption, 
        this.typeFilter, 
        this.statusFilter, 
        this.client, 
        this.selectedOptionSort, 
        this.itemSize,
        this.skill,
        this.side,
        this.effectType,
        this.level,
        this.effect,
        this.tag
      ).subscribe(
        (data) => {
          this.tickets = data.askedsList;
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
  }

  sort(name: string) {
    this.page = 1;
    this.selectedOption = name;
    this.sortOption = name;
    this.isLoading= true ;
    this.tickets = [];
    this.fetchTickets();
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.showExport = false;
  }

  toggleExport() {
    this.showExport = !this.showExport;
    this.showFilter = false;  
  }

  exportTypeSet(format: string) {
    this.exportType = format;
  }

  exportData() {
    if (this.exportType === 'csv') {
      this.exportToCsv();
    } else if (this.exportType === 'json') {
      this.exportToJson();
    } else if (this.exportType === 'xls') {
      this.exportToXls();
    } else if (this.exportType === 'pdf') {
      this.exportToPDF();
    } else {
      alert ('chose type export');
    }
  }

  private exportToCsv() {
    const csvData = this.convertToCsv(this.tickets);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tickets.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private exportToJson() {
    const jsonData = JSON.stringify(this.tickets, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tickets.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCsv(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  private exportToXls() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tickets);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
    XLSX.writeFile(wb, 'tickets.xlsx');
  }

  private exportToPDF() {
    const doc = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let yPosition = 10;
    const pageHeight = doc.internal.pageSize.height;

    this.tickets.forEach((ticket, index) => {
      const ticketData = `Ticket ${ticket.asked_ref}: ${ticket.asked_created_date}\nDescription: ${ticket.asked_description}`;
      const textLines = doc.splitTextToSize(ticketData, 180);

      if (yPosition + doc.getTextDimensions(textLines).h > pageHeight - 10) {
        doc.addPage();
        yPosition = 10;
      }

      doc.text(textLines, 10, yPosition);
      yPosition += doc.getTextDimensions(textLines).h + 10;
    });

    doc.save('tickets.pdf');
  }

  onSortOptionChange() {
    this.isLoading = true;
    this.fetchTickets();
  }

  search() {
    this.isLoading = true;
    this.fetchTickets();
  }

  loadMoreData() {
    this.page++;
    this.isLoading = true;
    this.fetchTickets();
  }
}
