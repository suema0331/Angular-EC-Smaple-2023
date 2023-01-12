import { CartDetailReadResponse } from '../../cart_detail/responses/cart_detail_read_response';
export interface CartSummaryReadResponse{

  cart_summary_id: string;
  last_access_date_time: Date;
  store_id: string;
  cart_details: CartDetailReadResponse[];
  creation_date: Date;
  last_update: Date;

}
