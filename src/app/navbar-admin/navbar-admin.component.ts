import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { NavigationEnd, Router } from '@angular/router';
import { getISOWeek } from 'date-fns';
import { OnCallService } from '../services/on-call.service';
import { InfosService } from '../services/infos.service';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  currentRoute!: string;
  isMenuVisible: boolean = false;
  isCreateTicketVisible$ = this.sharedService.isCreateTicketVisible$;
  menuImgSrc: string = 'assets/icons/menu.png';
  title!: string;
  onCallsThisWeek: any[] = [];
  onCallsLastWeek: any[] = [];
  onCallsNextWeek: any[] = [];
  isHovered: boolean = false;
  isLast: boolean = false;
  isCurrent: boolean = false;
  isNext: boolean = false;
  mail!: string;
  isEmergency: boolean = false;
  isPrimary: boolean = false;
  lastAskedLog: any[] = [];

  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentWeek: number = getISOWeek(this.currentDate);
  lastWeek: number = this.currentWeek - 1 ;
  nextWeek: number = this.currentWeek + 1 ;

  constructor(
    private onCallService: OnCallService,
    private authService: AuthService,
    private sharedTitleService: SharedTitleService,
    private infosServices: InfosService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit() {
    this.sharedTitleService.currentTitle.subscribe((newTitle) => {
      this.title = newTitle;
    });
    this.getOnCallThisWeek();
    this.getOnCallLastWeek();
    this.getOnCallNextWeek();
    this.getLastAskedLogs();
  }

  isCustomerEnabled(): boolean {
    return this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12;
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
    this.menuImgSrc = this.isMenuVisible ? 'assets/icons/menu-close.png' : 'assets/icons/menu.png';
  }

  isTechnnavRoute(): boolean {
    return this.currentRoute === '/';
  }

  isManagerEnabled(): boolean {
    return this.authService.getUserRole() === 1;
  }

  isTechnnavChildRoute(): boolean {
    return this.currentRoute !== '/';
  }
  
  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3 
  }

  toggleVisibility(): void {
    const currentVisibility = this.sharedService.getIsCreateTicketVisible();
    this.sharedService.setCreateTicketVisibility(!currentVisibility);
  }

  createTicket() {
    this.toggleMenu();
    this.toggleVisibility();
  }

  getOnCallThisWeek () {
    this.onCallService.findOnCallsBySemaine(this.currentWeek, this.currentYear).subscribe(
      data => {
        this.onCallsThisWeek = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getLastAskedLogs () {
    this.infosServices.getLastLogAsked().subscribe(
      data => {
        this.lastAskedLog = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getOnCallLastWeek () {
    this.onCallService.findOnCallsBySemaine(this.lastWeek, this.currentYear).subscribe(
      data => {
        this.onCallsLastWeek = data;
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }

  getOnCallNextWeek () {
    this.onCallService.findOnCallsBySemaine(this.nextWeek, this.currentYear).subscribe(
      data => {
        this.onCallsNextWeek = data;
        console.log(data);
      },
      error => {
        console.error('Erreur lors de la récupération des on calls:', error);
      }
    );
  }
}
