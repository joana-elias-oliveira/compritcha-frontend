import {Component, OnInit} from '@angular/core';
import {StatusCard} from './components/status-card/status-card';
import {SummaryCard} from './components/summary-card/summary-card';
import {Purchase} from '../../core/interfaces/purchase';
import {PurchaseService} from '../../core/services/purchase.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatusCard, SummaryCard, CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  purchases: Purchase[] = [];
  pendingCount = 0;
  completedCount = 0;
  rejectedCount = 0;
  totalValue = 0;
  totalItems = 0;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe({
      next: (data) => {
        this.purchases = data;
        this.updateDashboard();
      },
      error: (err) => console.error('Erro ao carregar compras:', err),
    });
  }

  updateDashboard(): void {
    this.pendingCount = this.purchases.filter(p => p.status === 'PENDING').length;
    this.completedCount = this.purchases.filter(p => p.status === 'COMPLETED').length;
    this.rejectedCount = this.purchases.filter(p => p.status === 'REJECTED').length;
    this.totalValue = this.purchases.reduce((acc, p) => acc + (Number(p.total) || 0), 0);
    this.totalItems = this.purchases.reduce((acc, p) => acc + (p.items?.length || 0), 0);
  }
}
