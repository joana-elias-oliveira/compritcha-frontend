import {Subitem} from './subitem';

export interface Item {
  id?: number;
  description: string;
  value: number;
  subitems?: Subitem[];
  quantity?: number;

}
