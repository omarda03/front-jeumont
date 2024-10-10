import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documentsinterne: any[] = [];
  categories: any[] = [];
  isLoading: boolean = true;
  plusClick: boolean = true;
  currentPage: number = 1;
  count: number = 0;
  pageSize: number = 10;
  containsText!: string ;
  doesNotContainText!: string;
  linkedWordsText!: string ;
  selectedCategory!: number;
  minSize!: number;
  maxSize!: number;
  startDate!: string ;
  endDate!: string ;

  constructor(
    private sharedTitleService: SharedTitleService,
    private infosService: InfosService
  ) {}

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchDocument');
    this.fetchDocuments(
      this.currentPage,
      this.pageSize,
      this.containsText,
      this.doesNotContainText,
      this.linkedWordsText,
      this.selectedCategory,
      this.minSize,
      this.maxSize,
      this.startDate,
      this.endDate
    );
    this.fetchCategories();
  }
  
  goToPage(pageNumber: any): void {
    const parsedPageNumber = parseInt(pageNumber, 10);
    if (!isNaN(parsedPageNumber)) {
      this.currentPage = Math.max(1, Math.min(parsedPageNumber, this.totalPages));
      this.fetchDocuments(
        this.currentPage,
        this.pageSize,
        this.containsText,
        this.doesNotContainText,
        this.linkedWordsText,
        this.selectedCategory,
        this.minSize,
        this.maxSize,
        this.startDate,
        this.endDate
      );
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
  get totalPages() {
    return Math.ceil(this.count / this.pageSize);
  }

  get paginatedDocuments(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.documentsinterne.slice(startIndex, endIndex);
  }


  fetchDocuments(
    page: number,
    pageSize: number,
    containsText: string,
    doesNotContainText: string,
    linkedWordsText: string,
    selectedCategory: number,
    minSize: number,
    maxSize: number,
    startDate: any,
    endDate: any
  ): void {
    this.infosService.getDocuments(
      page,
      pageSize,
      containsText,
      doesNotContainText,
      linkedWordsText,
      selectedCategory,
      minSize,
      maxSize,
      startDate,
      endDate
    ).subscribe(
      data => {
        this.count = data.count;
        this.documentsinterne = data.documentsinterne;
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    );
  }

  fetchCategories(): void {
    this.infosService.getCtageories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  togglePlusClick() {
    this.plusClick = !this.plusClick;
  }

  changePage(offset: number): void {
    this.isLoading = true;
    this.currentPage += offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.fetchDocuments(
      this.currentPage,
      this.pageSize,
      this.containsText,
      this.doesNotContainText,
      this.linkedWordsText,
      this.selectedCategory,
      this.minSize,
      this.maxSize,
      this.startDate,
      this.endDate
    );
  }
  
  GetPage(offset: number): void {
    this.isLoading = true;
    this.currentPage = offset;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.fetchDocuments(
      this.currentPage,
      this.pageSize,
      this.containsText,
      this.doesNotContainText,
      this.linkedWordsText,
      this.selectedCategory,
      this.minSize,
      this.maxSize,
      this.startDate,
      this.endDate
    );
  }

  search() {
    this.isLoading = true;

    this.fetchDocuments(
      this.currentPage,
      this.pageSize,
      this.containsText,
      this.doesNotContainText,
      this.linkedWordsText,
      this.selectedCategory,
      this.minSize,
      this.maxSize,
      this.startDate,
      this.endDate
    );
  }
}
