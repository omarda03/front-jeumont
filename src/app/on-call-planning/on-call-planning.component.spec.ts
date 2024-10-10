import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnCallPlanningComponent } from './on-call-planning.component';

describe('OnCallPlanningComponent', () => {
  let component: OnCallPlanningComponent;
  let fixture: ComponentFixture<OnCallPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnCallPlanningComponent]
    });
    fixture = TestBed.createComponent(OnCallPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
