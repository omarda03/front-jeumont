import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersClientComponent } from './customers-client.component';

describe('CustomersClientComponent', () => {
  let component: CustomersClientComponent;
  let fixture: ComponentFixture<CustomersClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomersClientComponent]
    });
    fixture = TestBed.createComponent(CustomersClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
