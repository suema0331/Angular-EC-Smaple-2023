import { JanCodeDto } from '../../common/jan_code_dto';
import { PriceDto } from '../../common/price_dto';
import { PriceWithTaxDto } from '../../common/price_with_tax_dto';
import { TaxRateDto } from '../../common/tax_rate_dto';
import { ProductImageReadResponse } from '../../product_image/responses/product_image_read_response';
import { SizeCompImageReadResponse } from '../../size_comp_image/responses/size_comp_image_read_response';
import { StoreProductTagReadResponse } from '../../store_product_tag/responses/store_product_tag_read_response';
import { CautionType } from '../../../enums/caution_type';
import { ExpirationDateDescription } from '../../../enums/expiration_date_description';
import { ProductClass } from '../../../enums/product_class';
import { ProductStatus } from '../../../enums/product_status';
import { SelectableType } from '../../../enums/selectable_type';
import { SellByWeightFlag } from '../../../enums/sell_by_weight_flag';
export interface StoreProductReadResponse{

  store_product_id: string;
  product_code: string;
  product_name: string;
  standard_price: PriceDto;
  store_price: PriceDto;
  standard_price_with_tax: PriceWithTaxDto;
  store_price_with_tax: PriceWithTaxDto;
  constraint_max: number;
  unit_price_per100g: PriceDto;
  producing_area: string;
  brand: string;
  internal_capacity: string;
  unit_range: string;
  store_comment: string;
  tax_rate: TaxRateDto;
  last_status_update: string;
  last_tags_update: string;
  caution: CautionType;
  selectable_type: SelectableType;
  expiration_date_description: ExpirationDateDescription;
  product_class: ProductClass;
  product_status: ProductStatus;
  jan_code: JanCodeDto;
  sell_by_weight_flag: SellByWeightFlag;
  tags: StoreProductTagReadResponse[];
  product_images: ProductImageReadResponse[];
  comp_images: SizeCompImageReadResponse[];
  creation_date: Date;
  last_update: Date;

}
