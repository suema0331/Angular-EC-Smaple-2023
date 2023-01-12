import { AvailableFlag } from '../../enums/available_flag';
export interface StoreTopMessage{

  notice_available_flag: AvailableFlag;
  notice1: string;
  notice2: string;
  delivery_available_flag: AvailableFlag;
  delivery_message: string;
  on_time_message: string;
  package_drop_message: string;
  store_pickup_message: string;
  delivery_discount_message: string;

}
