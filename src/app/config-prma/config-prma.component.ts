import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.service';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-config-prma',
  templateUrl: './config-prma.component.html',
  styleUrls: ['./config-prma.component.scss']
})
export class ConfigPrmaComponent  implements OnInit {
  asked: any;
  tickets: any[] = [];
  isLoading: boolean = true;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;
  searchDescription: string = '';

  constructor (
    private cookieService: CookieService,
    private ticketsService: TicketsService
  ) {}

  setAsked(ticket: any) {
    this.asked = ticket;
  }

  askedRefControl = new FormControl('', [Validators.maxLength(10)]);

  ngOnInit() {
    this.fetchTickets();
    this.asked= "select";
  }

  onSearchChange() {
    this.isLoading = true;
    this.fetchTickets();
  }

  fetchTickets() {
    this.ticketsService.getAskedPrmaList(this.searchDescription).subscribe(
      (data) => {
        this.tickets = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur:', error);
        this.isLoading = false;
      }
    );
  }

  submit() {
    const user_uuid = this.cookieService.get('user_uuid');
    this.ticketsService.updateAskedPRMA(this.asked, this.asked.asked_uuid, user_uuid).subscribe(
      response => {
        this.ngOnInit();
        this.onSearchChange();
        this.isError = false;
        this.text = `Ticket has been successfully updated!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while updating the ticket!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );
  }

  cancel() {
    this.asked = null;
  }

}
