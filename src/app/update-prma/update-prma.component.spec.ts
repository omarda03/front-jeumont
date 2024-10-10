import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrmaComponent } from './update-prma.component';

describe('UpdatePrmaComponent', () => {
  let component: UpdatePrmaComponent;
  let fixture: ComponentFixture<UpdatePrmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePrmaComponent]
    });
    fixture = TestBed.createComponent(UpdatePrmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
