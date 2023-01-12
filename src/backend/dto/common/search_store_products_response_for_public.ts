import { SearchStoreProductsCommonResult } from './search_store_products_common_result';
import { SearchStoreProductsDetailsResultForPublic } from './search_store_products_details_result_for_public';
export interface SearchStoreProductsResponseForPublic{

  common: SearchStoreProductsCommonResult;
  results: SearchStoreProductsDetailsResultForPublic[];
  detail: string;

}
