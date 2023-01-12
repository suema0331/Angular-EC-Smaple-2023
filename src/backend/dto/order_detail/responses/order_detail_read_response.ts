import { PriceDto } from '../../common/price_dto';
import { PriceWithTaxDto } from '../../common/price_with_tax_dto';
import { QuantityDto } from '../../common/quantity_dto';
import { TaxRateDto } from '../../common/tax_rate_dto';
import { StoreProductReadResponse } from '../../store_product/responses/store_product_read_response';
import { OrderDetailStatus } from '../../../enums/order_detail_status';
import { SellByWeightFlag } from '../../../enums/sell_by_weight_flag';
export interface OrderDetailReadResponse{

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
  sell_by_weight_flag: SellByWeightFlag;
  order_detail_status: OrderDetailStatus;
  store_product: StoreProductReadResponse;
  creation_date: Date;
  last_update: Date;

}
