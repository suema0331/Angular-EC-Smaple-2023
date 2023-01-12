import { QuantityDto } from '../../common/quantity_dto';
import { StoreProductReadResponse } from '../../store_product/responses/store_product_read_response';
export interface CartDetailReadResponse{

  cart_detail_id: string;
  quantity: QuantityDto;
  store_product: StoreProductReadResponse;
  creation_date: Date;
  last_update: Date;

}
