import { OrderStateChangeRequest } from '../dto/common/order_state_change_request';
import { OrderStateChangeResponse } from '../dto/common/order_state_change_response';
import { OrderSummaryExt } from '../dto/common/order_summary_ext';
import { RestClient } from '../../shared/services/rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrderRestUserServiceExt{

  constructor(
    private httpClient: RestClient
  ){}

  // 注文サマリを返すAPI - 拡張版
  listAllOrderSummaryByUserIdExt(id: string): Observable<[OrderSummaryExt]> {
    let endpoint = `/api/user/order/user/${id}/order_summaries_ext`;
    return this.httpClient.get<[OrderSummaryExt]>(endpoint);
  }

  // 注文サマリを返すAPI - 拡張版(listAllOrderSummaryByUserIdExt2) の データーを縮小版
  listAllOrderSummaryByUserIdExt2(id: string): Observable<[OrderSummaryExt]> {
    let endpoint = `/api/user/order/user/${id}/order_summaries_ext2`;
    return this.httpClient.get<[OrderSummaryExt]>(endpoint);
  }

  // 注文サマリを返すAPI - 拡張版
  getOrderSummaryByOrderSummaryIdExt(id: string): Observable<OrderSummaryExt> {
    const endpoint = `/api/user/order/order_summaries_ext/${id}`;
    return this.httpClient.get<OrderSummaryExt>(endpoint);
  }

  // ユーザーによってキャンセルされた事をバックエンドに伝える。
  cancelByUser(request: OrderStateChangeRequest): Observable<OrderStateChangeResponse> {
    const endpoint = `/api/user/order/cancel_by_user`;
    return this.httpClient.put<OrderStateChangeResponse>(endpoint, request);
  }

}
