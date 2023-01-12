import { DeliveryDayType } from '../../enums/delivery_day_type';
export interface UpdateStoreDeliveryFramesRequest{

  delivery_type: number;
  delivery_frame_no: number;
  start_date: number;
  end_date: number;
  delivery_day_type: DeliveryDayType;
  capacity: number;

}
