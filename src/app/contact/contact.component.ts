import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  emailAddress: string = 'Email@jeumontelectric.com';
  buttonText: string = 'Copier dans le presse papier';

  constructor(private clipboard: Clipboard) {}

  copyToClipboard(): void {
    this.clipboard.copy(this.emailAddress);
    this.buttonText = 'Copié !';
    setTimeout(() => {
      this.buttonText = 'Copier dans le presse papier';
    }, 2000);
  }
}
