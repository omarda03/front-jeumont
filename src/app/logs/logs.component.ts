import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  isLoading: boolean = true;
  askedLogs: any[] = [];
  askedLogsType: any[] = [];
  currentPage: number = 1;
  count: number = 0;
  pageSize: number = 10;
  selectedLogType: number = 0;
  plusClick: boolean = true;
  startDate!: string ;
  endDate!: string ;
  
  constructor(
    private sharedTitleService: SharedTitleService,
    private infosServices: InfosService
  ) {}

  togglePlusClick() {
    this.plusClick = !this.plusClick;
  }

  ngOnInit() {
    this.sharedTitleService.changeTitle('Logs');
    this.getAskedLogs(this.currentPage, this.pageSize, this.selectedLogType, this.startDate, this.endDate);
    this.fetchAskedLogsType();
  }

  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  get paginatedDocuments(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.askedLogs.slice(startIndex, endIndex);
  }

  getAskedLogs (page: number, pageSize: number, selectedLogType: number, startDate: any, endDate: any) {
    this.infosServices.getAllAskedLog(page, pageSize, selectedLogType, startDate, endDate).subscribe(
      data => {
        console.log(data);
        this.count = data.count;
        this.askedLogs = data.logs;
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  fetchAskedLogsType(): void {
    this.infosServices.getAllAskedLogType().subscribe(
      data => {
        this.askedLogsType = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  changePage(offset: number): void {
    this.isLoading = true ;
    
    this.currentPage += offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.getAskedLogs( this.currentPage, this.pageSize, this.selectedLogType, this.startDate, this.endDate);
  }

  search() {
    this.isLoading = true;

    this.getAskedLogs( this.currentPage, this.pageSize, this.selectedLogType, this.startDate, this.endDate);
  }
}
