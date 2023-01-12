import {CartSummaryReadResponse} from '../dto/cart_summary/responses/cart_summary_read_response';
import {Pageable} from '../dto/common/pageable';
import {CountResponse} from '../dto/common/responses/count_response';
import {RestClient} from '../../shared/services/rest.client';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CartSummaryRestUserService{

  constructor(
    private httpClient: RestClient
  ){}

  // すべての CartSummary の件数取得 (自動生成)
  // GET /api/user/cart_summaries/count
  // エンティティ(CartSummary)の件数の取得)
  countCartSummary(): Observable<CountResponse> {
    const endpoint = `/api/user/cart_summaries/count`;
    return this.httpClient.get<CountResponse>(endpoint);
  }

  // ある User に含まれる CartSummary の件数取得 (自動生成)
  // GET /api/user/users/{id}/cart_summaries/count
  // エンティティ(CartSummary)の件数の取得)
  countCartSummaryBy(id: string): Observable<CountResponse> {
    const endpoint = `/api/user/users/${id}/cart_summaries/count`;
    return this.httpClient.get<CountResponse>(endpoint);
  }

  // ある CartSummary の取得 (自動生成)
  // GET /api/user/cart_summaries/{id}
  //  - id : 集約ルート(CartSummary)のId(Long)
  getCartSummaryByCartSummaryId(id: string): Observable<CartSummaryReadResponse> {
    const endpoint = `/api/user/cart_summaries/${id}`;
    return this.httpClient.get<CartSummaryReadResponse>(endpoint);
  }

  // すべての CartSummary を取得 (自動生成)
  // GET /api/user/cart_summaries
  listAllCartSummary(pageable?: Pageable): Observable<[CartSummaryReadResponse]> {
    let endpoint = `/api/user/cart_summaries`;
    if (pageable !== undefined && (
      (pageable.page_number !== undefined && pageable.page_size !== undefined) ||
      (pageable.sort_field !== undefined)))
    {
      endpoint += '?';
      let isQueryParamEmpty = true;
      if (pageable.page_number !== undefined && pageable.page_size !== undefined){
        endpoint = endpoint + 'page=' + String(pageable.page_number) + '&size=' + String(pageable.page_size);
        isQueryParamEmpty = false;
      }
      if (pageable.sort_field !== undefined){
        if (!isQueryParamEmpty) {
          endpoint = endpoint + '&';
        }
        endpoint = endpoint + 'sort=' + pageable.sort_field;
        if (pageable.sort_order === undefined) {
          endpoint = endpoint + '&order=ASC';
        } else {
          endpoint = endpoint + '&order=' + pageable.sort_order;
        }
      }
    }
    return this.httpClient.get<[CartSummaryReadResponse]>(endpoint);
  }

  // 外部キー storeIdで CartSummary の取得 (自動生成)
  // GET /api/user/cart_summaries/store_id/{storeId}
  listAllCartSummaryByStoreId(storeId: string, pageable?: Pageable): Observable<[CartSummaryReadResponse]> {
    let endpoint = `/api/user/cart_summaries/store_id/${storeId}`;
    if (pageable !== undefined && (
      (pageable.page_number !== undefined && pageable.page_size !== undefined) ||
      (pageable.sort_field !== undefined)))
    {
      endpoint += '?';
      let isQueryParamEmpty = true;
      if (pageable.page_number !== undefined && pageable.page_size !== undefined){
        endpoint = endpoint + 'page=' + String(pageable.page_number) + '&size=' + String(pageable.page_size);
        isQueryParamEmpty = false;
      }
      if (pageable.sort_field !== undefined){
        if (!isQueryParamEmpty) {
          endpoint = endpoint + '&';
        }
        endpoint = endpoint + 'sort=' + pageable.sort_field;
        if (pageable.sort_order === undefined) {
          endpoint = endpoint + '&order=ASC';
        } else {
          endpoint = endpoint + '&order=' + pageable.sort_order;
        }
      }
    }
    return this.httpClient.get<[CartSummaryReadResponse]>(endpoint);
  }

  // 集約ルート("User") のリスト取得 (自動生成)
  // GET /api/user/users/{id}/cart_summaries
  //  - id  : 集約ルート(User)のId(Long)
  listAllCartSummaryByUserId(id: string, pageable?: Pageable): Observable<[CartSummaryReadResponse]> {
    let endpoint = `/api/user/users/${id}/cart_summaries`;
    if (pageable !== undefined && (
      (pageable.page_number !== undefined && pageable.page_size !== undefined) ||
      (pageable.sort_field !== undefined)))
    {
      endpoint += '?';
      let isQueryParamEmpty = true;
      if (pageable.page_number !== undefined && pageable.page_size !== undefined){
        endpoint = endpoint + 'page=' + String(pageable.page_number) + '&size=' + String(pageable.page_size);
        isQueryParamEmpty = false;
      }
      if (pageable.sort_field !== undefined){
        if (!isQueryParamEmpty) {
          endpoint = endpoint + '&';
        }
        endpoint = endpoint + 'sort=' + pageable.sort_field;
        if (pageable.sort_order === undefined) {
          endpoint = endpoint + '&order=ASC';
        } else {
          endpoint = endpoint + '&order=' + pageable.sort_order;
        }
      }
    }
    return this.httpClient.get<[CartSummaryReadResponse]>(endpoint);
  }

}
