import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrfmComponent } from './update-prfm.component';

describe('UpdatePrfmComponent', () => {
  let component: UpdatePrfmComponent;
  let fixture: ComponentFixture<UpdatePrfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePrfmComponent]
    });
    fixture = TestBed.createComponent(UpdatePrfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
