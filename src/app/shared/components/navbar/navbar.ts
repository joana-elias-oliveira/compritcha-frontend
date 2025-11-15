import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faLanguage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMenuOpen = false;

  faBars = faBars;
  faXmark = faXmark;
  faLanguage = faLanguage;

  constructor(library: FaIconLibrary) {
    library.addIcons(faBars, faXmark, faLanguage);
  }
}
