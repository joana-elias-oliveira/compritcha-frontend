import { Routes } from '@angular/router';
import {Dashboard} from './features/dashboard/dashboard';
import {PurchaseCreateEdit} from './features/purchase-create-edit/purchase-create-edit';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    title: 'Compritcha | Início',
  },
  {
    path: 'compras',
    loadComponent: () =>
      import('./features/purchases/purchases').then(
        (m) => m.Purchases
      ),
    title: 'Compritcha | Compras',
  },
  { path: 'compras/nova', component: PurchaseCreateEdit },
  { path: 'compras/editar/:id', component: PurchaseCreateEdit },
  {
    path: '**',
    redirectTo: '',
  },
];
