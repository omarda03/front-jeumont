import { Component, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.scss']
})
export class ModelCreateComponent {
  @Input() isCreateTicketVisible!: boolean;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleCreateTicket() {
    this.sharedService.setCreateTicketVisibility(!this.isCreateTicketVisible);
  }

  isCreationEnabledPRFS(): boolean {
    return this.authService.getUserRole() === 1 || this.authService.getUserRole() === 2;
  }

  isCreationEnabledPRFM(): boolean {
    return this.authService.getUserRole() === 1 || this.authService.getUserRole() === 2;
  }

  isCreationEnabledPRMA(): boolean {
    return this.authService.getUserRole() === 1 || this.authService.getUserRole() === 3;
  }

  navigatePrfs() {
    this.router.navigate(['/create/prfs']);
    this.toggleCreateTicket();
  }

  navigatePrfm() {
    this.router.navigate(['/create/prfm']);
    this.toggleCreateTicket();
  }

  navigatePrma() {
    this.router.navigate(['/create/prma']);
    this.toggleCreateTicket();
  } 
  
}
