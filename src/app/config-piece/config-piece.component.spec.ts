import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigPieceComponent } from './config-piece.component';

describe('ConfigPieceComponent', () => {
  let component: ConfigPieceComponent;
  let fixture: ComponentFixture<ConfigPieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigPieceComponent]
    });
    fixture = TestBed.createComponent(ConfigPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
