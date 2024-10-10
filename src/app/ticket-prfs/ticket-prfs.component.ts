import { Component, Input, OnInit } from '@angular/core';
import { InfosService } from '../services/infos.service';
import { OnCallService } from '../services/on-call.service';
import { AuthService } from '../services/auth.service';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-ticket-prfs',
  templateUrl: './ticket-prfs.component.html',
  styleUrls: ['./ticket-prfs.component.scss']
})
export class TicketPrfsComponent implements OnInit {
  @Input() askedCreateDate: any;
  @Input() idAsked: any;
  data: any;
  tagsAsked: any[] = [];
  isExpanded: boolean = false;
  onCallsWeek: any[] = [];
  effectsAsked: any[] = []; 
  isHovered: boolean = false;
  userMail: string = '';
  timeDifference!: string;

  constructor (
    private ticketsService: TicketsService,
    private onCallService: OnCallService,
    private infosService: InfosService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.getOnCallNextWeek();
    this.fetchAskedTags();
    this.calculateTimeDifference();
    this.fetchTicket();
    this.fetchEffectsByAsked();
  }

  isCustomerEnabled(): boolean {
    return this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12;
  }

  isManagerEnabled(): boolean {
    return this.authService.getUserRole() === 1;
  }

  fetchTicket() {
    this.ticketsService.getOneAskedPRFSData(this.idAsked).subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  fetchEffectsByAsked(): void {
    if (this.idAsked !== null) { 
      this.infosService.getEffectsByAsked(this.idAsked).subscribe(
        data => {
          this.effectsAsked = data;
        },
        error => {
          console.error('Error fetching asked details:', error);
        }
      );
    }
  }

  calculateTimeDifference() {
    const currentTime = new Date();
    const askedDate = new Date(this.askedCreateDate);
  
    const timeDifferenceMillis = currentTime.getTime() - askedDate.getTime();
  
    const diffInMinutes = Math.floor(timeDifferenceMillis / (1000 * 60));
    const diffInHours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
    const diffInDays = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));
  
    if (diffInMinutes < 1) {
      this.timeDifference = 'Just now';
    } else if (diffInMinutes === 1) {
      this.timeDifference = '1 minute ago';
    } else if (diffInHours < 1) {
      this.timeDifference = `${diffInMinutes} minutes ago`;
    } else if (diffInHours === 1) {
      this.timeDifference = '1 hour ago';
    } else if (diffInDays < 1) {
      this.timeDifference = `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      this.timeDifference = '1 day ago';
    } else {
      this.timeDifference = `${diffInDays} days ago`;
    }
  }
  
  shouldShowTitle(): boolean {
    const userRole = this.authService.getUserRole();
    return userRole === 10 || userRole === 11 || userRole === 12;
  }

  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3 
  }
  
  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  private fetchAskedTags(): void {
    if (this.idAsked !== null) { 
      this.infosService.getTagsByAsked(this.idAsked).subscribe(
        data => {
          this.tagsAsked = data;
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  deleteTicket(): void {
    if (this.idAsked !== null) { 
      this.ticketsService.deletePrfs(this.idAsked).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
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

  getColorRGB(statusId: number, urgency: boolean): string {
    const currentTime = new Date();
    const askedDate = new Date(this.askedCreateDate);
  
    const timeDifferenceMillis = currentTime.getTime() - askedDate.getTime();

    if (statusId === 1 && timeDifferenceMillis > 6 * 60 * 60 * 1000 && urgency) { // 6 hours in milliseconds
      return '255, 0, 0'; // Red color
    } else if (statusId === 1 && timeDifferenceMillis > 6 * 60 * 60 * 1000 && !urgency) {
      return '255, 165, 0';
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
