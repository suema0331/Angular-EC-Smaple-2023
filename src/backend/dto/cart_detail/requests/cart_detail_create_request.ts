import { QuantityDto } from '../../common/quantity_dto';
export interface CartDetailCreateRequest{

  parent_cart_summary_id: string;
  quantity: QuantityDto;
  store_product_fk: string;

}
