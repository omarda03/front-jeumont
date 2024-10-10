import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCustomerComponent } from './config-customer.component';

describe('ConfigCustomerComponent', () => {
  let component: ConfigCustomerComponent;
  let fixture: ComponentFixture<ConfigCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigCustomerComponent]
    });
    fixture = TestBed.createComponent(ConfigCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
