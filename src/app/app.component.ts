import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRoute!: string;

  constructor(private router: Router, translate: TranslateService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { this.currentRoute = event.url }
    });

    translate.setDefaultLang('en');
    translate.use('en');
  }
}
