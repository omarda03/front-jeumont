import { Component, Input, OnInit } from '@angular/core';
import { OnCallService } from '../services/on-call.service';
import { InfosService } from '../services/infos.service';
import { AuthService } from '../services/auth.service';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-ticket-prfm',
  templateUrl: './ticket-prfm.component.html',
  styleUrls: ['./ticket-prfm.component.scss']
})
export class TicketPrfmComponent implements OnInit {
  @Input() askedCreateDate: any;
  @Input() idAsked: any;
  data: any;
  prfss: any[] = [];
  onCallsWeek: any[] = [];
  isHovered: boolean = false;
  userMail: string = '';
  isExpanded: boolean = false;
  attachements: any[] = [];
  
  constructor (
    private ticketsService: TicketsService,
    private onCallService: OnCallService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getOnCallNextWeek();
    this.fetchTicket();
    this.fetchRelatedPrfs();
    this.getAttachements();
  }

  private getAttachements() {
    this.ticketsService.getAttachements(this.idAsked).subscribe(
      data => {
        this.attachements = data;
      },
      error => {
        console.error('Erreur lors de la récupération des types d\'effet:', error);
      }
    );
  }

  isCustomerEnabled(): boolean {
    return this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12;
  }

  fetchRelatedPrfs() {
    this.ticketsService.getRelatedPrfs(this.idAsked).subscribe(
      (data) => {
        this.prfss = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  fetchTicket() {
    this.ticketsService.getOneAskedPRFMData(this.idAsked).subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  getOnCallNextWeek () {
    this.onCallService.findOnChangeId(this.idAsked).subscribe(
      data => {
        this.onCallsWeek = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  shouldShowTitle(): boolean {
    const userRole = this.authService.getUserRole();
    return userRole === 10 || userRole === 11 || userRole === 12;
  }
  
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  
  getColorRGB(statusId: number): string {
    const currentTime = new Date();
    const askedDate = new Date(this.askedCreateDate);
  
    const timeDifferenceMillis = currentTime.getTime() - askedDate.getTime();

    if (statusId === 1 && timeDifferenceMillis > 6 * 60 * 60 * 1000) { // 6 hours in milliseconds
      return '255, 0, 0'; // Red color
    }
  
    switch (statusId) {
      case 5: 
      case 6:
        return '128, 128, 128'; // Gray
      case 7:
        return '255, 0, 0'; // Red
      case 2: 
      case 3: 
      case 4: 
        return '255, 255, 0'; // Yellow
      case 1: 
        return '255, 165, 0'; // Orange
      default:
        return '255, 255, 255'; // White
    }
  }  
}


