import { PickProduct } from './pick_product';
export interface OrderPickProducts{

  order_summary_id: string;
  picked_products: PickProduct[];

}
