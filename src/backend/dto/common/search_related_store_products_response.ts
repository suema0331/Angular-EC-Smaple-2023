import { SearchRelatedStoreProductsDetailsResult } from './search_related_store_products_details_result';
import { SearchStoreProductsCommonResult } from './search_store_products_common_result';
export interface SearchRelatedStoreProductsResponse{

  common: SearchStoreProductsCommonResult;
  results: SearchRelatedStoreProductsDetailsResult[];
  detail: string;

}
