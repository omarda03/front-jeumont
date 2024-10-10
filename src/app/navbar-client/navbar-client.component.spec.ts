import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarClientComponent } from './navbar-client.component';
import { SharedTitleService } from '../services/shared-title.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarClientComponent', () => {
  let component: NavbarClientComponent;
  let fixture: ComponentFixture<NavbarClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarClientComponent],
      imports: [RouterTestingModule],
      providers: [SharedTitleService]
    });
    fixture = TestBed.createComponent(NavbarClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility', () => {
    component.isMenuVisible = false;
    component.toggleMenu();
    expect(component.isMenuVisible).toBe(true);
    component.toggleMenu();
    expect(component.isMenuVisible).toBe(false);
  });

  it('should set the correct menu image source', () => {
    component.isMenuVisible = false;
    component.toggleMenu();
    expect(component.menuImgSrc).toBe('assets/icons/menu-close.png');
    component.toggleMenu();
    expect(component.menuImgSrc).toBe('assets/icons/menu.png');
  });
});
