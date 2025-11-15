import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PurchaseForm } from '../purchase-form/purchase-form';
import { Purchase } from '../../core/interfaces/purchase';
import { PurchaseService } from '../../core/services/purchase.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-purchase-create-edit',
  standalone: true,
  imports: [CommonModule, PurchaseForm],
  templateUrl: './purchase-create-edit.html',
  styleUrl: './purchase-create-edit.scss',
})
export class PurchaseCreateEdit implements OnInit {
  mode: 'create' | 'edit' = 'create';
  purchase: Purchase | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseService: PurchaseService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.purchaseService.getById(+id).subscribe({
        next: (data) => (this.purchase = data),
        error: () =>
          this.toast.show(
            'Erro ao carregar compra',
            'Não foi possível carregar as informações da compra.',
            'error'
          ),
      });
    }
  }

  handleSave(purchase: Purchase) {
    if (this.mode === 'edit' && this.purchase) {
      this.purchaseService.update(this.purchase.id!, purchase).subscribe({
        next: () => {
          this.toast.show('Compra atualizada', 'As alterações foram salvas com sucesso!', 'success');
          this.router.navigate(['/compras']);
        },
        error: () =>
          this.toast.show(
            'Erro ao editar',
            'Não foi possível atualizar a compra. Tente novamente.',
            'error'
          ),
      });
    } else {
      this.purchaseService.create(purchase).subscribe({
        next: () => {
          this.toast.show('Compra criada', 'Compra adicionada com sucesso!', 'success');
          this.router.navigate(['/compras']);
        },
        error: () =>
          this.toast.show(
            'Erro ao criar',
            'Não foi possível criar a compra. Tente novamente.',
            'error'
          ),
      });
    }
  }

  handleCancel() {
    this.router.navigate(['/compras']);
  }
}
