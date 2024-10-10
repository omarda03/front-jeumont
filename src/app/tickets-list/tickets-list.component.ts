import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { TagsService } from '../services/tags.service';
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  isfilter: boolean = false;
  currentPage: number = 1;
  isLoading = true;
  tickets: any[] = [];
  allTickets: any[] = [];
  askedDescription: string = '';
  count: number = 0;
  sortOption: string = '';
  selectedOption: string | null = null;
  showFilter = false;
  showExport = false;
  customers: any[] = [];
  status: any[] = [];
  client: string = '';
  ships: any[] = [];
  tags: any[] = [];
  effects: any[] = [];
  levels: any[] = [];
  effectTypes: any[] = [];
  sides: any[] = [];
  skills: any[] = [];
  techniciensSupport: any[] = [];
  technicien_support: string = '';
  skill: string = '';
  side: string = '';
  effectType: string = '';
  level: string = '';
  effect: string = '';
  tag: string = '';
  ship: string = '';
  searchDescription: string = '';
  searchDescriptionOption: number = 1;
  pageSize: number = 40;
  typeFilter: string = '';
  statusFilter: number = 0;
  exportType: string = '';
  selectedOptionSort: string = 'desc';
  startDate: string | undefined;
  endDate: string | undefined;
  currentDate = new Date();
  
  day = this.currentDate.getDate().toString().padStart(2, '0'); 
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear().toString();


  constructor(
    private ticketsService: TicketsService,
    private usersService: UsersService,
    private tagsService: TagsService,
    private sharedTitleService: SharedTitleService,
    private infosService: InfosService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.sharedTitleService.changeTitle('listingTickets');
    this.fetchTickets();
    this.fetchAllTickets();
    this.fetchCustomers();
    this.fetchStatus();
    this.fetchShips();
    this.fetchTags();
    this.fetchEffects();
    this.fetchLevels();
    this.fetchSides();
    this.fetchSkills();
    this.fetchEffectTypes();
    this.fetchtechniciensSupport();
    this.loadSortOptionsFromCookies();
  }

  private fetchtechniciensSupport(): void {
    this.usersService.findUsersTech('').subscribe(
      data => {
        this.techniciensSupport = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
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

  fetchAllTickets() {
    this.ticketsService.getAskedAllData().subscribe(
      (data) => {
        this.allTickets = data;
      },
      (error) => {
        this.isLoading = false;
        alert(error.error.message);
        console.error('Erreur:', error);
      }
    );
  }

  private fetchShips(): void {
    if (this.client) {
      this.infosService.getShipsByCustomer(this.client).subscribe(
        data => {
          this.ships = data;
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    } else {
      this.infosService.getShips().subscribe(
        data => {
          this.ships = data;
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  resetFilter() {
    this.isfilter = false;
    this.isLoading = true;
    this.client= '';
    this.ship='';
    this.skill = '';
    this.side = '';
    this.effectType = '';
    this.level = '';
    this.effect = '';
    this.tag = '';
    this.startDate= undefined;
    this.endDate= undefined;
    
    this.statusFilter= 0;
    this.typeFilter = '';
    this.fetchTickets();
    this.toggleFilter();
  }
   goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.fetchTickets();
    }
  }

  getPageNumbers(currentPage: number, totalPages: number): any[] {
    const pageNumbers = [];
    const maxDisplayedPages = 5;

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        console.log(totalPages, "total page");
        console.log(this.totalPages, "total page fo");
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
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
    }

  applyStatusFilter(status: number) {
    this.isfilter = true;
    this.statusFilter = status;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyClientFilter(client: string) {
    this.isfilter = true;
    this.client = client;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchShips();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyShipFilter(ship: string) {
    this.isfilter = true;
    this.ship = ship;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applySkillFilter(skill: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.skill = skill;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applySideFilter(side: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.side = side;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyEffectTypeFilter(effectType: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.effectType = effectType;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyLevelFilter(level: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 3;
    this.level = level;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }
  
  applyEffectFilter(effect: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 8;
    this.effect = effect;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyTagFilter(tag: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 7;
    this.tag = tag;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyTechnicienSupportFilter(technicien_support: string) {
    this.isfilter = true;
    this.searchDescriptionOption = 9;
    this.technicien_support = technicien_support;
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
    this.toggleFilter();
  }

  applyDateFilter() {
    if (this.startDate !== undefined && this.endDate !== undefined ) {
      this.isfilter = true;
      this.isLoading = true;
      this.saveSortOptionsToCookies();
      this.fetchTickets();
      this.toggleFilter();
    }
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

  fetchTickets() {
    this.ticketsService.getAskedData(
      this.currentPage, 
      this.searchDescription,
      this.searchDescriptionOption,
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
      this.technicien_support
    ).subscribe(
      (data) => {
        console.log(data);
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

  sort(name: string) {
    this.currentPage = 1;
    this.selectedOption = name;
    this.sortOption = name;
    this.isLoading= true ;
    this.tickets = [];
    this.saveSortOptionsToCookies();
    this.fetchTickets();
  }

  loadSortOptionsFromCookies(): void {
    this.askedDescription = this.cookieService.get('askedDescription') ;
    this.sortOption = this.cookieService.get('sortOption');
    this.selectedOption = this.cookieService.get('selectedOption');
    this.selectedOptionSort = this.cookieService.get('selectedOptionSort') || 'desc';
    this.typeFilter = this.cookieService.get('selectedOptionSort');
    this.statusFilter = Number(this.cookieService.get('statusFilter'));
    this.client = this.cookieService.get('client');
    this.ship = this.cookieService.get('ship');
    this.skill = this.cookieService.get('skill');
    this.side = this.cookieService.get('side');
    this.effectType = this.cookieService.get('effectType');
    this.level = this.cookieService.get('level');
    this.effect = this.cookieService.get('effect');
    this.tag = this.cookieService.get('tag');
    this.technicien_support = this.cookieService.get('technicien_support');
    this.exportType = this.cookieService.get('exportType');
  }

  saveSortOptionsToCookies(): void {
    this.cookieService.set('askedDescription', this.askedDescription);
    this.cookieService.set('sortOption', this.sortOption);
    this.cookieService.set('selectedOption', `${this.selectedOption}`);
    this.cookieService.set('selectedOptionSort', this.selectedOptionSort);
    this.cookieService.set('typeFilter', this.typeFilter);
    this.cookieService.set('statusFilter', `${this.statusFilter}`);
    this.cookieService.set('client', this.client);
    this.cookieService.set('ship', this.ship);
    this.cookieService.set('skill', this.skill);
    this.cookieService.set('side', this.side);
    this.cookieService.set('effectType', this.effectType);
    this.cookieService.set('level', this.level);
    this.cookieService.set('effect', this.effect);
    this.cookieService.set('tag', this.tag);
    this.cookieService.set('technicien_support', this.technicien_support);
    this.cookieService.set('exportType', this.exportType);
  }

  get totalPages() {
    console.log(this.count, "count");
    console.log(this.pageSize, "page size");
    return Math.ceil(this.count / this.pageSize);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.showExport = false;
  }

  toggleExport() {
    this.showExport = !this.showExport;
    this.showFilter = false;
    this.exportType = '';
  }

  exportTypeSet(format: string) {
    this.exportType = format;
  }

  exportData() {
    if (this.exportType === 'csv') {
      this.exportToCsv();
      this.toggleExport();
    } else if (this.exportType === 'json') {
      this.exportToJson();
      this.toggleExport();
    } else if (this.exportType === 'xls') {
      this.exportToXls();
      this.toggleExport();
    } else if (this.exportType === 'pdf') {
      this.exportToPDF();
      this.toggleExport();
    } else {
      alert ('chose type export');
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

    this.fetchTickets();
  }

  private exportToCsv() {
    const csvData = this.convertToCsv(this.allTickets);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Export_data_${this.day}${this.month}${this.year}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private exportToJson() {
    const jsonData = JSON.stringify(this.allTickets, null, 2);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Export_data_${this.day}${this.month}${this.year}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCsv(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  private exportToXls() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allTickets);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
    XLSX.writeFile(wb, `Export_data_${this.day}${this.month}${this.year}.xlsx`);
  }

  private exportToPDF() {
    const doc = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    let yPosition = 10;
    const pageHeight = doc.internal.pageSize.height;

    this.allTickets.forEach((ticket, index) => {
      const ticketData = `Ticket ${ticket.asked_ref}: ${ticket.asked_created_date}\nDescription: ${ticket.asked_description}`;
      const textLines = doc.splitTextToSize(ticketData, 180);

      if (yPosition + doc.getTextDimensions(textLines).h > pageHeight - 10) {
        doc.addPage();
        yPosition = 10;
      }

      doc.text(textLines, 10, yPosition);
      yPosition += doc.getTextDimensions(textLines).h + 10;
    });

    doc.save(`Export_data_${this.day}${this.month}${this.year}.pdf`);
  }

  onSortOptionChange() {
    this.isLoading = true;
    this.saveSortOptionsToCookies();
    this.fetchTickets();
  }

  search() {
    this.isLoading = true;
    this.fetchTickets();
  }
}
