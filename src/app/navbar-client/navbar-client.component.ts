import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrls: ['./navbar-client.component.scss']
})
export class NavbarClientComponent implements OnInit {
      
  isMenuVisible = false;
  menuImgSrc: string = 'assets/icons/menu.png';
  title!: string;

  constructor(
    private sharedTitleService: SharedTitleService,
  ) {}
  
  ngOnInit(): void {
    // Abonnement au service pour mettre à jour le titre en temps réel
    this.sharedTitleService.currentTitle.subscribe((newTitle) => {
      this.title = newTitle;
    });
  }

  // Méthode pour basculer l'affichage du menu
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
    this.menuImgSrc = this.isMenuVisible ? 'assets/icons/menu-close.png' : 'assets/icons/menu.png';
  }
}



