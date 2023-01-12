import { OrderPickProducts } from './order_pick_products';
export interface CompletePickingBulkRequest{

  store_id: string;
  order_pick_products_list: OrderPickProducts[];

}
