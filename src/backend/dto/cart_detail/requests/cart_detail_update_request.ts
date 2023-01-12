import { QuantityDto } from '../../common/quantity_dto';
export interface CartDetailUpdateRequest{

  cart_detail_id: string;
  quantity: QuantityDto;
  store_product_fk: string;

}
