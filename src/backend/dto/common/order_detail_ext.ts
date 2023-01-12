import { PriceDto } from './price_dto';
import { PriceWithTaxDto } from './price_with_tax_dto';
import { QuantityDto } from './quantity_dto';
import { TaxRateDto } from './tax_rate_dto';
import { UserSelectionExt } from './user_selection_ext';
import { StoreProductReadResponse } from '../store_product/responses/store_product_read_response';
export interface OrderDetailExt{

  order_detail_id: string;
  quantity: QuantityDto;
  estimate_product_price_without_tax: PriceDto;
  estimate_product_price_with_tax: PriceWithTaxDto;
  settlement_product_price_without_tax: PriceDto;
  settlement_product_price_with_tax: PriceWithTaxDto;
  estimate_price_without_tax: PriceDto;
  estimate_price_with_tax: PriceWithTaxDto;
  settlement_price_without_tax: PriceDto;
  settlement_price_with_tax: PriceWithTaxDto;
  tax_rate: TaxRateDto;
  memo_for_shortage: string;
  sort_priority_for_store: number;
  store_division_to_pick: string;
  sell_by_weight_flag: number;
  order_detail_status: number;
  store_product: StoreProductReadResponse;
  user_selection: UserSelectionExt;

}
