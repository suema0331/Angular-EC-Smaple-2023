import { StoreProductReadResponse } from '../../store_product/responses/store_product_read_response';
export interface CategoryStoreProductReadResponse{

  category_store_product_id: string;
  store_product: StoreProductReadResponse;
  creation_date: Date;
  last_update: Date;

}
