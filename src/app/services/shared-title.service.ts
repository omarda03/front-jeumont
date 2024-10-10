import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SharedTitleService {
  
  private titleSource = new BehaviorSubject<string>('Default Title');
  currentTitle = this.titleSource.asObservable();

  changeTitle(newTitle: string) {
    this.titleSource.next(newTitle);
  }
}
