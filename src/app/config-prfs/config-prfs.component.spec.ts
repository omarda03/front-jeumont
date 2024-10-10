import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPrfsComponent } from './config-prfs.component';

describe('ConfigPrfsComponent', () => {
  let component: ConfigPrfsComponent;
  let fixture: ComponentFixture<ConfigPrfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPrfsComponent]
    });
    fixture = TestBed.createComponent(ConfigPrfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
