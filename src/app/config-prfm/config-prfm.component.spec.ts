import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPrfmComponent } from './config-prfm.component';

describe('ConfigPrfmComponent', () => {
  let component: ConfigPrfmComponent;
  let fixture: ComponentFixture<ConfigPrfmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPrfmComponent]
    });
    fixture = TestBed.createComponent(ConfigPrfmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
