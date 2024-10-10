// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private isCreateTicketVisibleSource = new BehaviorSubject<boolean>(false);
  isCreateTicketVisible$ = this.isCreateTicketVisibleSource.asObservable();

  setCreateTicketVisibility(isVisible: boolean): void {
    this.isCreateTicketVisibleSource.next(isVisible);
  }

  getIsCreateTicketVisible(): boolean {
    return this.isCreateTicketVisibleSource.value;
  }
}
