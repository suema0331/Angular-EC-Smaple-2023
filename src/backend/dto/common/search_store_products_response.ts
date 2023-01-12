import { SearchStoreProductsCommonResult } from './search_store_products_common_result';
import { SearchStoreProductsDetailsResult } from './search_store_products_details_result';
export interface SearchStoreProductsResponse{

  common: SearchStoreProductsCommonResult;
  results: SearchStoreProductsDetailsResult[];
  detail: string;

}
