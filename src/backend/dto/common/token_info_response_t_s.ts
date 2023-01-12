import { TokenObtainStatus } from '../../enums/token_obtain_status';
export interface TokenInfoResponseTS{

  access_token?: string;
  access_token_expire?: string;
  refresh_token?: string;
  refresh_token_expire?: string;
  user_id?: string;
  status: TokenObtainStatus;
  second_last_login: string;

}
