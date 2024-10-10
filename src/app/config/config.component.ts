import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { ActivatedRoute, ChildActivationEnd, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface RouteItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>(); 
  currentRoute: string = 'prfs';
  configRoutes: RouteItem[] = [
    { path: 'prfs', label: 'PRFS' },
    { path: 'prfm', label: 'PRFM' },
    { path: 'prma', label: 'PRMA' },
    { path: 'categories', label: 'Categories' },
    { path: 'users', label: 'Users perms' },
    { path: 'customers', label: 'Customers' },
    { path: 'ships', label: 'Ships' },
    { path: 'documents', label: 'Documents' },
    { path: 'pieces', label: 'Spares ' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedTitleService: SharedTitleService,
  ) {}

  ngOnInit() {
    this.route.firstChild?.url.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((segments) => {
      this.currentRoute = segments[0]?.path || '';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.updateCurrentRoute();
    });
  
    this.sharedTitleService.changeTitle('config');
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeUrl() { this.updateCurrentRoute() }

  private updateCurrentRoute() {
    this.route.firstChild?.url.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((segments) => {
      this.currentRoute = segments[0]?.path || '';
    });
  }
}
