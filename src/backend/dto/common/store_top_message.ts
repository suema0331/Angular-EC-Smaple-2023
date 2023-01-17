import { AvailableFlag } from '../../enums/available_flag';
export interface StoreTopMessage {
  notice_available_flag: AvailableFlag;
  notice1: string;
  notice2: string;
  store_available_flag: AvailableFlag;
  operation_message: string;
}
