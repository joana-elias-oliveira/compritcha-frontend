import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Purchase } from '../../core/interfaces/purchase';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-form.html',
  styleUrls: ['./purchase-form.scss'],
})
export class PurchaseForm implements OnChanges {
  @Input() purchase: Purchase | null = null;
  @Output() save = new EventEmitter<Purchase>();
  @Output() cancel = new EventEmitter<void>();

  description = '';
  status: 'PENDING' | 'COMPLETED' | 'REJECTED' | '' = '';
  items: { description: string; value: number }[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['purchase'] && this.purchase) {
      this.loadPurchaseData();
    }
  }

  private loadPurchaseData(): void {
    this.description = this.purchase?.description || '';
    this.status = this.purchase?.status || '';
    this.items =
      this.purchase?.items?.map((i) => ({
        description: i.description,
        value: Number(i.value),
      })) || [];
  }

  isFormValid(): boolean {
    if (this.purchase) return true

    const hasDescription = this.description.trim().length > 0;
    const hasStatus = this.status !== '';
    const hasItems = this.items.length > 0;
    const allItemsFilled = this.items.every(
      (i) => i.description.trim().length > 0 && i.value > 0
    );

    return hasDescription && hasStatus && hasItems && allItemsFilled;
  }

  onSave(): void {
    if (!this.isFormValid()) return;
    const purchase: Purchase = {
      ...this.purchase,
      description: this.description,
      status: this.status as 'PENDING' | 'COMPLETED' | 'REJECTED',
      items: this.items.map((i) => ({
        description: i.description,
        value: i.value,
        subitems: [],
      })),
      total: this.items.reduce((acc, i) => acc + i.value, 0),
    };
    this.save.emit(purchase);
  }

  addItem(): void {
    this.items.push({ description: '', value: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }

  get total(): number {
    return this.items.reduce((acc, i) => acc + (i.value || 0), 0);
  }
}
