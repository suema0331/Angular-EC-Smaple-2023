import { CartDetailExt } from './cart_detail_ext';
import { PriceSetDto } from './price_set_dto';

export interface CartSummaryExt{

  store_id: string;
  cart_details: CartDetailExt[];
  estimate_price_set: PriceSetDto;
  coupon_code_msg: string;

}
