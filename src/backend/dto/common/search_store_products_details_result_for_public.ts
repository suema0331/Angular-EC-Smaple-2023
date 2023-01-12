export interface SearchStoreProductsDetailsResultForPublic{

  store_product_id: string;
  product_code: string;
  product_name: string;
  jan_code_value: string;
  producing_area: string;
  brand: string;
  standard_price_value: number;
  standard_price_with_tax_value: number;
  store_price_value: number;
  store_price_with_tax_value: number;
  unit_price_per100g_value: number;
  unit_range: string;
  internal_capacity: string;
  product_status: number;
  last_status_update: string;
  product_image_id: string;
  image_master_url: string;
  image_medium_url: string;
  image_small_url: string;
  product_tag_id: string;
  tag_name: string;
  min_display_priority: number;
  cart_quantity: number;

}
