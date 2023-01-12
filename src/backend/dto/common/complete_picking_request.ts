import { PickProduct } from './pick_product';
export interface CompletePickingRequest{

  store_id: string;
  order_summary_id: string;
  picked_products: PickProduct[];

}
