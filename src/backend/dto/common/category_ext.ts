import { StoreProductExt } from './store_product_ext';
export interface CategoryExt{

  category_id: string;
  category_name: string;
  category_image_url: string;
  store_division_image_url: string;
  children: CategoryExt[];
  depth: number;
  store_products: StoreProductExt[];
  parent_category_id: string;
  cached_date?: string;

}
