import { StoreProductExt } from '../dto/common/store_product_ext';
import { StoreTopMessage } from '../dto/common/store_top_message';
import { UserDivisionPageInfo } from '../dto/common/user_division_page_info';
import { UserRegistrationStatus } from '../dto/common/user_registration_status';
import { UserTopPageInfo } from '../dto/common/user_top_page_info';
import { RestClient } from '../../shared/services/rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserQueryRestUserServiceExt{

  constructor(
    private httpClient: RestClient
  ){}

  getTopPageInfo(storeId: string): Observable<UserTopPageInfo> {
    const endpoint = `/api/user/user_query/get_top_page_info`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    return this.httpClient.get<UserTopPageInfo>(endpoint, {params});
  }

  // 売り場ページ情報の取得
  getDivisionPageInfo(storeId: string): Observable<UserDivisionPageInfo> {
    const endpoint = `/api/user/user_query/get_division_page_info`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    return this.httpClient.get<UserDivisionPageInfo>(endpoint, {params});
  }

  getUserRecommendations(storeId: string, userId: string): Observable<[StoreProductExt]> {
    const endpoint = `/api/user/user_query/get_user_recommendations`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    params = params.append('userId', userId);
    return this.httpClient.get<[StoreProductExt]>(endpoint, {params});
  }

  getCommonRecommendations(storeId: string): Observable<[StoreProductExt]> {
    const endpoint = `/api/user/user_query/get_common_recommendations`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    return this.httpClient.get<[StoreProductExt]>(endpoint, {params});
  }

  // あるユーザーのある店舗商品のお気に入り一覧
  getUserFavorites(storeId: string, userId: string): Observable<[StoreProductExt]> {
    const endpoint = `/api/user/user_query/get_user_favorites`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    params = params.append('userId', userId);
    return this.httpClient.get<[StoreProductExt]>(endpoint, {params});
  }

  // あるユーザー向けに店舗商品詳細情報を返す。
  getProductDetailForUser(storeProductId: string, userId: string): Observable<StoreProductExt> {
    const endpoint = `/api/user/user_query/get_product_detail_for_user`;
    let params = new HttpParams();
    params = params.append('storeProductId', storeProductId);
    params = params.append('userId', userId);
    return this.httpClient.get<StoreProductExt>(endpoint, {params});
  }

  // ログインしてないユーザー向けにある店舗商品詳細情報を返す。
  getProductDetailForNoLogin(storeProductId: string): Observable<StoreProductExt> {
    const endpoint = `/api/user/user_query/get_product_detail_for_no_login`;
    let params = new HttpParams();
    params = params.append('storeProductId', storeProductId);
    return this.httpClient.get<StoreProductExt>(endpoint, {params});
  }

  // あるユーザーのある店舗の購入履歴
  getPurchaseHistory(storeId: string, userId: string): Observable<[StoreProductExt]> {
    const endpoint = `/api/user/user_query/get_purchase_history`;
    let params = new HttpParams();
    params = params.append('storeId', storeId);
    params = params.append('userId', userId);
    return this.httpClient.get<[StoreProductExt]>(endpoint, {params});
  }

  // getUserSelection(userId: string, storeProductId: string): Observable<UserSelectionExt> {
  //   const endpoint = `/api/user/user_query/get_user_selection`;
  //   let params = new HttpParams();
  //   params = params.append('userId', userId);
  //   params = params.append('storeProductId', storeProductId);
  //   return this.httpClient.get<UserSelectionExt>(endpoint, {params});
  // }

  // ユーザーアプリのトップ画面に表示するメッセージやらを取得する。
  getStoreTopMessage(storeId: string): Observable<StoreTopMessage> {
    const endpoint = `/api/user/user_query/store/${storeId}/store_top_message`;
    return this.httpClient.get<StoreTopMessage>(endpoint);
  }

  getUserRegistrationStatus(userId: string): Observable<UserRegistrationStatus> {
    const endpoint = `/api/user/user_query/get_user_registration_status`;
    let params = new HttpParams();
    params = params.append('userId', userId);
    return this.httpClient.get<UserRegistrationStatus>(endpoint, {params});
  }

}
