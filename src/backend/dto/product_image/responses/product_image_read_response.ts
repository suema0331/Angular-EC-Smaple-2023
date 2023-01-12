export interface ProductImageReadResponse{

  product_image_id: string;
  sort_order: number;
  image_master_folder_url: string;
  image_master_url: string;
  image_medium_folder_url: string;
  image_medium_url: string;
  image_small_folder_url: string;
  image_small_url: string;
  creation_date: Date;
  last_update: Date;

}
