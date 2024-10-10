import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigShipsComponent } from './config-ships.component';

describe('ConfigShipsComponent', () => {
  let component: ConfigShipsComponent;
  let fixture: ComponentFixture<ConfigShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigShipsComponent]
    });
    fixture = TestBed.createComponent(ConfigShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
