import { StoreProductUpdateRequest } from '../store_product/requests/store_product_update_request';
export interface StoreProductUpdateRequestExt{

  store_product_update_request: StoreProductUpdateRequest;
  category_ids: string[];
  product_tag_ids: string[];

}
