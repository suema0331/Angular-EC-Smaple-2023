import { UserFavoriteCreateRequest } from '../dto/user_favorite/requests/user_favorite_create_request';
import { UserFavoriteCreateResponse } from '../dto/user_favorite/responses/user_favorite_create_response';
import { RestClient } from '../../shared/services/rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserFavoriteRestUserService{

  constructor(
    private httpClient: RestClient
  ){}

  // UserFavorite の作成(自動生成)
  // POST /api/user/users/{id}/user_favorites
  //  - id : エンティティ(User)のId(Long)
  createUserFavorite(data: UserFavoriteCreateRequest, id: string): Observable<UserFavoriteCreateResponse> {
    const endpoint = `/api/user/users/${id}/user_favorites`;
    return this.httpClient.post<UserFavoriteCreateResponse>(endpoint, data);
  }

}
