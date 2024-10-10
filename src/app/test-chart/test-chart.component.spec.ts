import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChartComponent } from './test-chart.component';

describe('TestChartComponent', () => {
  let component: TestChartComponent;
  let fixture: ComponentFixture<TestChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestChartComponent]
    });
    fixture = TestBed.createComponent(TestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
