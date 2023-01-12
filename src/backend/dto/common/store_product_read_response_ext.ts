import { CategoryReadResponse } from '../category/responses/category_read_response';
import { StoreProductReadResponse } from '../store_product/responses/store_product_read_response';
export interface StoreProductReadResponseExt{

  store_product: StoreProductReadResponse;
  categories: CategoryReadResponse[];

}
