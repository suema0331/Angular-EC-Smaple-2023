import { StoreProductExt } from "./store_product_ext";

export interface CartToOrder{

  user_id: string;
  order_date: Date;
  order_products: StoreProductExt[];

}
