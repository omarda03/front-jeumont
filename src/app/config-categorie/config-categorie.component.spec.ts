import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCategorieComponent } from './config-categorie.component';

describe('ConfigCategorieComponent', () => {
  let component: ConfigCategorieComponent;
  let fixture: ComponentFixture<ConfigCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigCategorieComponent]
    });
    fixture = TestBed.createComponent(ConfigCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
