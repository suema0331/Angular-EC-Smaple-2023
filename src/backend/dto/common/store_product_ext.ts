import { ProductStatus } from '../../enums/product_status';
import { ProductImageExt } from './product_image_ext';
export interface StoreProductExt {
  store_product_id: string;
  product_name: string;
  standard_price: number;
  store_price: number;
  constraint_max: number;
  producing_area: string;
  brand: string;
  internal_capacity: string;
  unit_range: string;
  store_comment: string;
  tags: string[];
  product_images: ProductImageExt[];
  purchased_flag: number;
  favorite_flag: number;
  product_status: ProductStatus;
  cart_quantity: number;
  product_view_image_list: ProductImageExt[];
}
