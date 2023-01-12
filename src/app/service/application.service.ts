import { Injectable } from '@angular/core';
// import { SystemStatusRestUserServiceExt } from '../../backend/services/system.status.rest.user.service.ext';
import { Observable } from 'rxjs';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
// import { UserQueryRestUserServiceExt } from 'src/backend/services/user.query.rest.user.service.ext';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(
    // private systemStatusRestUserServiceExt: SystemStatusRestUserServiceExt,
    // private userQueryRestUserServiceExt: UserQueryRestUserServiceExt,
  ) { }

  // TOPおすすめ商品(login済会員)
  // getUserRecommendations(storeId: string, userId: string): Observable<[StoreProductExt]> {
  //   return this.userQueryRestUserServiceExt.getUserRecommendations(storeId, userId);
  // }


}
