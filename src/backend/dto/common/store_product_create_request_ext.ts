import { StoreProductCreateRequest } from '../store_product/requests/store_product_create_request';
export interface StoreProductCreateRequestExt{

  store_product_create_request: StoreProductCreateRequest;
  category_ids: string[];
  product_tag_ids: string[];

}
