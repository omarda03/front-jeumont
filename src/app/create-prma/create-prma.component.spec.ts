import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrmaComponent } from './create-prma.component';

describe('CreatePrmaComponent', () => {
  let component: CreatePrmaComponent;
  let fixture: ComponentFixture<CreatePrmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePrmaComponent]
    });
    fixture = TestBed.createComponent(CreatePrmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
