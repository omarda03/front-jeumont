import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrfmComponent } from './ticket-prfm.component';

describe('TicketPrfmComponent', () => {
  let component: TicketPrfmComponent;
  let fixture: ComponentFixture<TicketPrfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketPrfmComponent]
    });
    fixture = TestBed.createComponent(TicketPrfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
