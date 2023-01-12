export interface ProductImageCreateRequest{

  parent_store_product_id: string;
  sort_order: number;
  image_master: string;
  image_medium: string;
  image_small: string;

}
