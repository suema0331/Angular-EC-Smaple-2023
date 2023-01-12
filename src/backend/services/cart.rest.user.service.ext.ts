import { CartClearRequest } from '../dto/common/cart_clear_request';
import { CartClearResponse } from '../dto/common/cart_clear_response';
import { CartOperationRequest } from '../dto/common/cart_operation_request';
import { CartOperationResult } from '../dto/common/cart_operation_result';
import { CartSummaryExt } from '../dto/common/cart_summary_ext';
// import { CartToOrderForDeliveryParam } from '../dto/common/cart_to_order_for_delivery_param';
import { CartToOrderResponse } from '../dto/common/cart_to_order_response';
import { PreFlightResult } from '../dto/common/pre_flight_result';
import { RestClient } from '../../shared/services/rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartRestUserServiceExt{

  constructor(
    private httpClient: RestClient
  ){}

  // カートの指定の商品指定の数量にする。0以下にすると 対応する CartDetailは削除される。
  // The quantity of the product specified in the CartDetail is set to the quantity specified in the CartDetail.
  // If set to 0 or less, CartDetail will be deleted.
  updateCartDetail(request: CartOperationRequest): Observable<CartOperationResult> {
    const endpoint = `/api/user/cart/update_cart_detail`;
    return this.httpClient.post<CartOperationResult>(endpoint, request);
  }

  // Order from the contents of the cart
  // Include a coupon code in the parameters so that it can be used when confirming the order, and so that the estimated amount can be calculated.
  getCart(userId: string, storeId: string, coupon: string): Observable<CartSummaryExt> {
    const endpoint = `/api/user/cart/get_cart`;
    let params = new HttpParams();
    params = params.append('userId', userId);
    params = params.append('storeId', storeId);
    params = params.append('coupon', coupon);
    return this.httpClient.get<CartSummaryExt>(endpoint, {params});
  }

  // Empty the cart of a store for a user.
  clearCart(request: CartClearRequest): Observable<CartClearResponse> {
    const endpoint = `/api/user/cart/clear_cart`;
    return this.httpClient.put<CartClearResponse>(endpoint, request);
  }

}
