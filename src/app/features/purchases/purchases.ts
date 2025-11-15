import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faEye, faPen, faTrash, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Purchase } from '../../core/interfaces/purchase';
import { PurchaseService } from '../../core/services/purchase.service';
import {ToastService} from '../../core/services/toast.service';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './purchases.html',
  styleUrls: ['./purchases.scss'],
})
export class Purchases implements OnInit {
  purchases: Purchase[] = [];
  activeFilter: 'ALL' | 'PENDING' | 'COMPLETED' | 'REJECTED' = 'ALL';
  expandedItemId: number | null = null;
  confirmTarget: Purchase | null = null;
  editingStatusId: number | null = null;
  dropdownPosition = { top: 0, left: 0 };
  statusOptions: Array<'PENDING' | 'COMPLETED' | 'REJECTED'> = ['PENDING', 'COMPLETED', 'REJECTED'];
  loading = false;
  page = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(
    library: FaIconLibrary,
    private router: Router,
    private purchaseService: PurchaseService,
    private toast: ToastService
  ) {
    library.addIcons(faEye, faPen, faTrash, faCheck, faChevronUp, faFileExcel);
  }

  ngOnInit(): void {
    this.loadPurchases();
  }

  setFilter(filter: 'ALL' | 'PENDING' | 'COMPLETED' | 'REJECTED'): void {
    this.activeFilter = filter;
    this.loadPurchases();
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'Pendente';
      case 'COMPLETED': return 'Aprovado';
      case 'REJECTED': return 'Rejeitado';
      default: return status;
    }
  }

  getHeaderColor(): string {
    switch (this.activeFilter) {
      case 'PENDING': return '#FDC9DF';
      case 'COMPLETED': return '#B6E8EA';
      case 'REJECTED': return '#FACFA7';
      default: return '#E0D1FF';
    }
  }

  toggleView(id: number): void {
    this.expandedItemId = this.expandedItemId === id ? null : id;
  }

  toggleEditStatus(id: number, event: MouseEvent): void {
    event.stopPropagation();

    if (this.editingStatusId === id) {
      this.editingStatusId = null;
      return;
    }

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    const dropdownLeft = rect.left + rect.width / 2;
    const dropdownHeight = 100;
    const windowHeight = window.innerHeight;

    let dropdownTop: number;
    let openUp = false;

    if (rect.bottom + dropdownHeight > windowHeight) {
      dropdownTop = rect.top + window.scrollY - dropdownHeight - 12;
      openUp = true;
    } else {
      dropdownTop = rect.bottom + window.scrollY - 6;
    }

    document.documentElement.style.setProperty('--dropdown-left', `${dropdownLeft}px`);
    document.documentElement.style.setProperty('--dropdown-top', `${dropdownTop}px`);
    document.documentElement.style.setProperty('--dropdown-direction', openUp ? 'up' : 'down');

    this.editingStatusId = id;
  }

  updateStatus(purchase: Purchase, newStatus: 'PENDING' | 'COMPLETED' | 'REJECTED'): void {
    if (purchase.status === newStatus) {
      this.editingStatusId = null;
      return;
    }

    this.purchaseService.updateStatus(purchase.id!, newStatus).subscribe({
      next: (updated) => {
        purchase.status = updated.status;
        this.editingStatusId = null;
      },
      error: () => {
        this.editingStatusId = null;
      },
    });
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.editingStatusId = null;
  }

  onEdit(purchase: Purchase): void {
    this.router.navigate(['/compras/editar', purchase.id]);
  }

  onCreate(): void {
    this.router.navigate(['/compras/nova']);
  }

  onDelete(purchase: Purchase, event?: MouseEvent): void {
    event?.stopPropagation();
    this.confirmTarget = purchase;
  }

  closeConfirm(): void {
    this.confirmTarget = null;
  }

  confirmDelete(): void {
    if (!this.confirmTarget) return;
    this.purchaseService.delete(this.confirmTarget.id!).subscribe({
      next: () => {
        this.purchases = this.purchases.filter(p => p.id !== this.confirmTarget!.id);
        this.toast.show('Compra excluída', 'A compra foi removida com sucesso!', 'success');
        this.confirmTarget = null;
      },
      error: () => {
        this.toast.show('Erro ao excluir', 'Não foi possível excluir a compra.', 'error');
      },
    });
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get paginatedPurchases(): Purchase[] {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.purchases.slice(start, end);
  }

  nextPage(): void {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }

  goToPage(p: number): void {
    this.page = p;
  }

  loadPurchases(): void {
    this.loading = true;
    const status = this.activeFilter === 'ALL' ? undefined : this.activeFilter;
    this.purchaseService.getAll(status).subscribe({
      next: (data) => {
        this.purchases = data.map((p) => ({
          ...p,
          total: Number(String(p.total).replace(/[^\d.-]/g, '')) || 0,
        }));
        this.totalPages = Math.ceil(this.purchases.length / this.pageSize);
        this.loading = false;
      },
      error: () => {
        this.toast.show('Erro ao carregar', 'Não foi possível carregar as compras.', 'error');
        this.loading = false;
      },
    });
  }

  exportToExcel(): void {
    const header = ['Descrição', 'Status', 'Total'];
    const rows = this.purchases.map(p => [
      p.description,
      this.getStatusLabel(p.status),
      p.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header, ...rows].map(e => e.join(';')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'compras.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
