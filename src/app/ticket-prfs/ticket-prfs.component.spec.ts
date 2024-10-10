import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrfsComponent } from './ticket-prfs.component';

describe('TicketPrfsComponent', () => {
  let component: TicketPrfsComponent;
  let fixture: ComponentFixture<TicketPrfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketPrfsComponent]
    });
    fixture = TestBed.createComponent(TicketPrfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
