import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDocumentsComponent } from './config-documents.component';

describe('ConfigDocumentsComponent', () => {
  let component: ConfigDocumentsComponent;
  let fixture: ComponentFixture<ConfigDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigDocumentsComponent]
    });
    fixture = TestBed.createComponent(ConfigDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
