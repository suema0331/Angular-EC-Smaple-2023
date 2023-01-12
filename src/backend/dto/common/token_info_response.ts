import { TokenObtainStatus } from '../../enums/token_obtain_status';
export interface TokenInfoResponse{

  access_token?: string;
  access_token_expire?: Date;
  refresh_token?: string;
  refresh_token_expire?: Date;
  user_id?: string;
  status: TokenObtainStatus;
  second_last_login: string;

}
