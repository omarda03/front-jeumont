import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrmpComponent } from './ticket-prmp.component';

describe('TicketPrmpComponent', () => {
  let component: TicketPrmpComponent;
  let fixture: ComponentFixture<TicketPrmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketPrmpComponent]
    });
    fixture = TestBed.createComponent(TicketPrmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
