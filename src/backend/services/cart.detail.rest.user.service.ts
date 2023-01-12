import {CartDetailReadResponse} from '../dto/cart_detail/responses/cart_detail_read_response';
import {Pageable} from '../dto/common/pageable';
import {RestClient} from '../../shared/services/rest.client';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CartDetailRestUserService{

  constructor(
    private httpClient: RestClient
  ){}

  // 全ての CartSummary を取得 (自動生成)
  // GET /api/user/cart_details
  listAllCartDetail(pageable?: Pageable): Observable<[CartDetailReadResponse]> {
    let endpoint = `/api/user/cart_details`;
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
    return this.httpClient.get<[CartDetailReadResponse]>(endpoint);
  }

  // ある CartSummary に含まれる CartDetailのリスト取得 (自動生成)
  // GET /api/user/cart_summaries/{id}/cart_details
  //  - id  : 集約ルート(CartSummary)のId(Long)
  listAllCartDetailByCartSummaryId(id: string, pageable?: Pageable): Observable<[CartDetailReadResponse]> {
    let endpoint = `/api/user/cart_summaries/${id}/cart_details`;
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
    return this.httpClient.get<[CartDetailReadResponse]>(endpoint);
  }

  // CartDetailの取得 (自動生成)
  // GET /api/user/cart_details/{id}
  //  - id : エンティティ(CartDetail)のId(Long)
  getCartDetailByCartDetailId(id: string): Observable<CartDetailReadResponse> {
    const endpoint = `/api/user/cart_details/${id}`;
    return this.httpClient.get<CartDetailReadResponse>(endpoint);
  }

}
