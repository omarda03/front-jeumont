import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPrmaComponent } from './config-prma.component';

describe('ConfigPrmaComponent', () => {
  let component: ConfigPrmaComponent;
  let fixture: ComponentFixture<ConfigPrmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPrmaComponent]
    });
    fixture = TestBed.createComponent(ConfigPrmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
