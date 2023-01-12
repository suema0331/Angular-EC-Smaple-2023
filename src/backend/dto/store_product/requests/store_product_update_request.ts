import { JanCodeDto } from '../../common/jan_code_dto';
import { PriceDto } from '../../common/price_dto';
import { TaxRateDto } from '../../common/tax_rate_dto';
import { ProductClass } from '../../../enums/product_class';
import { ProductStatus } from '../../../enums/product_status';
import { SellByWeightFlag } from '../../../enums/sell_by_weight_flag';
export interface StoreProductUpdateRequest{

  store_product_id: string;
  product_code: string;
  product_name: string;
  standard_price: PriceDto;
  store_price: PriceDto;
  constraint_max: number;
  unit_price_per100g: PriceDto;
  producing_area: string;
  brand: string;
  internal_capacity: string;
  unit_range: string;
  store_comment: string;
  tax_rate: TaxRateDto;
  product_class: ProductClass;
  product_status: ProductStatus;
  jan_code: JanCodeDto;
  sell_by_weight_flag: SellByWeightFlag;

}
