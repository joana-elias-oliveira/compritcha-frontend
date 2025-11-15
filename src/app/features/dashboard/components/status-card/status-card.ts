import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import { faClock, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './status-card.html',
  styleUrl: './status-card.scss',
})
export class StatusCard {
  @Input() color = '#ddd';
  @Input() title = '';
  @Input() count = 0;
  @Input() subtitle = '';
  @Input() icon = '';

  constructor(library: FaIconLibrary) {
    library.addIcons(faClock, faCheckCircle, faBan);
  }
}
