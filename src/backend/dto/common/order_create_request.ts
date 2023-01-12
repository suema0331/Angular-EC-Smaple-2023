export interface OrderCreateRequest{

  store_id: string;
  user_id: string;
  receipt_date: number;
  receiving_method: number;
  delivery_type: number;
  cart_summary_id: string;
  coupon_code: string;

}
