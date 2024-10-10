import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTicketClientComponent } from './list-ticket-client.component';

describe('ListTicketClientComponent', () => {
  let component: ListTicketClientComponent;
  let fixture: ComponentFixture<ListTicketClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTicketClientComponent]
    });
    fixture = TestBed.createComponent(ListTicketClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
