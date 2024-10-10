import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrfmComponent } from './create-prfm.component';

describe('CreatePrfmComponent', () => {
  let component: CreatePrfmComponent;
  let fixture: ComponentFixture<CreatePrfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePrfmComponent]
    });
    fixture = TestBed.createComponent(CreatePrfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
