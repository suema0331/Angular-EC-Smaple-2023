import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  /**
   * Services for the Application layer.
   * Not used at this time.
   * The front-end calls the app service and does not call the backend service form ./backend/services directly.
   * In ApplicationService, the backend services that the frontend wants to invoke are centrally managed in the application layer (ApplicationService)
   * and are provided by appModule.
   *  */
  // constructor(
  // private userQueryRestUserServiceExt: UserQueryRestUserServiceExt,
  // ) { }
  // e.g. Recommended products for the user on the TOP oage
  // getUserRecommendations(storeId: string, userId: string): Observable<[StoreProductExt]> {
  //   return this.userQueryRestUserServiceExt.getUserRecommendations(storeId, userId);
  // }
}
