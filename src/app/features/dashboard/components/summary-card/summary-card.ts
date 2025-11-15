import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {faCartShopping, faBoxOpen, faMoneyBillWave, faFlask} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.scss',
})
export class SummaryCard {
  @Input() color = '#f59e0b';
  @Input() icon: any = ['fas', 'money-bill-wave'];
  @Input() title = 'Total em Compras';
  @Input() value = 'R$ 4.250,00';

  @Input() secondaryIcon: any = ['fas', 'flask'];
  @Input() secondaryTitle = 'Total de Itens';
  @Input() secondaryValue = '28 itens';

  constructor(library: FaIconLibrary) {
    library.addIcons(faMoneyBillWave, faFlask, faCartShopping);
  }
}
