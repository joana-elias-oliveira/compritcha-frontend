import {Subitem} from './subitem';
import {Item} from './item';
export type PurchaseStatus = 'PENDING' | 'COMPLETED' | 'REJECTED';

export interface Purchase {
  id?: number;
  description: string;
  status: PurchaseStatus;
  total?: number;
  quantidade?: number;
  items?: Item[];
}
