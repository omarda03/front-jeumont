import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrfsComponent } from './create-prfs.component';

describe('CreatePrfsComponent', () => {
  let component: CreatePrfsComponent;
  let fixture: ComponentFixture<CreatePrfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePrfsComponent]
    });
    fixture = TestBed.createComponent(CreatePrfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
