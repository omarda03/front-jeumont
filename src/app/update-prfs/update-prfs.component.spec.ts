import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrfsComponent } from './update-prfs.component';

describe('UpdatePrfsComponent', () => {
  let component: UpdatePrfsComponent;
  let fixture: ComponentFixture<UpdatePrfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePrfsComponent]
    });
    fixture = TestBed.createComponent(UpdatePrfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
