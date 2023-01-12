import { DeliveryBox } from './delivery_box';
export interface CompletePackingRequest{

  store_id: string;
  order_summary_id: string;
  delivery_box: DeliveryBox;
  order_memo: string;

}
