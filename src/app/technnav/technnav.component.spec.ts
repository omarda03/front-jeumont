import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnnavComponent } from './technnav.component';

describe('TechnnavComponent', () => {
  let component: TechnnavComponent;
  let fixture: ComponentFixture<TechnnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnnavComponent]
    });
    fixture = TestBed.createComponent(TechnnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});