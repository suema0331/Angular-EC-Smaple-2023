export interface SearchStoreProductsParam{

  store_id: number[];
  search_word: string;
  sort_col: string;
  sort_desc: boolean;
  page_num: number;
  page_limit: number;
  product_creation_date_from: string;
  product_creation_date_to: string;
  product_creation_date_all: boolean;
  product_last_update_from : string;
  product_last_update_to: string;
  product_last_update_all: boolean;
  product_status: number[];
  product_tag_name: string[];
  category_name: string[];
  category_depth: number[];

}
