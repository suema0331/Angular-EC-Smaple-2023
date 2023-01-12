import { SearchStoreProductsCommonResult } from './search_store_products_common_result';
import { SearchStoreProductsDetailsResultForUser } from './search_store_products_details_result_for_user';
export interface SearchStoreProductsResponseForUser{

  common: SearchStoreProductsCommonResult;
  results: SearchStoreProductsDetailsResultForUser[];
  detail: string;

}
