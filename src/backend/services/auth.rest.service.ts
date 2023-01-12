import { ChangeUserNameRequestParam } from '../dto/common/change_user_name_request_param';
import { CheckPasswordRequest } from '../dto/common/check_password_request';
import { CommonResponse } from '../dto/common/common_response';
import { OpenIdUserCreateRequest } from '../dto/common/open_id_user_create_request';
import { OpenIdUserCreateResponse } from '../dto/common/open_id_user_create_response';
import { PasswordOperationResponse } from '../dto/common/password_operation_response';
import { RefreshTokenParam } from '../dto/common/refresh_token_param';
import { ResetPasswordRequest } from '../dto/common/reset_password_request';
import { SetPasswordRequest } from '../dto/common/set_password_request';
import { SetPasswordRequestExt } from '../dto/common/set_password_request_ext';
import { TokenInfoParam } from '../dto/common/token_info_param';
import { TokenInfoResponse } from '../dto/common/token_info_response';
import { TokenInfoResponseTS } from '../dto/common/token_info_response_t_s';
import { UserInfoUpdateParam } from '../dto/common/user_info_update_param';
import { AuthRestClient } from '../../shared/services/auth.rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthRestService{

  constructor(
    private httpClient: AuthRestClient
  ){}

  createUser(request: OpenIdUserCreateRequest): Observable<OpenIdUserCreateResponse> {
    const endpoint = `/api/auth/create_user`;
    return this.httpClient.post<OpenIdUserCreateResponse>(endpoint, request);
  }

  createStaff(request: OpenIdUserCreateRequest): Observable<OpenIdUserCreateResponse> {
    const endpoint = `/api/auth/create_staff`;
    return this.httpClient.post<OpenIdUserCreateResponse>(endpoint, request);
  }

  createAdmin(request: OpenIdUserCreateRequest): Observable<OpenIdUserCreateResponse> {
    const endpoint = `/api/auth/create_admin`;
    return this.httpClient.post<OpenIdUserCreateResponse>(endpoint, request);
  }

  // ユーザーパスワードの設定
  userSetPassword(request: SetPasswordRequest): Observable<CommonResponse> {
    const endpoint = `/api/auth/user_set_password`;
    return this.httpClient.post<CommonResponse>(endpoint, request);
  }

  // ユーザーパスワードの設定
  userSetPasswordExt(request: SetPasswordRequestExt): Observable<PasswordOperationResponse> {
    const endpoint = `/api/auth/user_set_password_ext`;
    return this.httpClient.post<PasswordOperationResponse>(endpoint, request);
  }

  // ユーザーパスワードリセット用リンクの送信
  userResetPassword(request: ResetPasswordRequest): Observable<CommonResponse> {
    const endpoint = `/api/auth/user_reset_password`;
    return this.httpClient.post<CommonResponse>(endpoint, request);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  getNewUserToken(data: TokenInfoParam): Observable<TokenInfoResponseTS> {
    const endpoint = `/api/auth/get_new_user_token`;
    return this.httpClient.post<TokenInfoResponseTS>(endpoint, data);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  refreshUserToken(data: RefreshTokenParam): Observable<TokenInfoResponseTS> {
    const endpoint = `/api/auth/refresh_user_token`;
    return this.httpClient.post<TokenInfoResponseTS>(endpoint, data);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  getNewStaffToken(data: TokenInfoParam): Observable<TokenInfoResponseTS> {
    const endpoint = `/api/auth/get_new_staff_token`;
    return this.httpClient.post<TokenInfoResponseTS>(endpoint, data);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  refreshStaffToken(data: RefreshTokenParam): Observable<TokenInfoResponseTS> {
    const endpoint = `/api/auth/refresh_staff_token`;
    return this.httpClient.post<TokenInfoResponseTS>(endpoint, data);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  getNewAdminToken(data: TokenInfoParam): Observable<TokenInfoResponse> {
    const endpoint = `/api/auth/get_new_admin_token`;
    return this.httpClient.post<TokenInfoResponse>(endpoint, data);
  }

  // アクセストークン・リフレッシュトークンの新規取得
  // Httpは Basic認証(システム共通コード) で
  // パラメーターにユーザーの ID:Password を Base64でエンコードした Basic認証コードでリクエストする。
  refreshAdminToken(data: RefreshTokenParam): Observable<TokenInfoResponse> {
    const endpoint = `/api/auth/refresh_admin_token`;
    return this.httpClient.post<TokenInfoResponse>(endpoint, data);
  }

  // ユーザー情報更新(本登録時用)
  // 仮登録後、置配確認用のデフォルト住所に郵便番号と住所１のみが登録された状態の残りの情報を更新する
  updateUserInfo(data: UserInfoUpdateParam): Observable<CommonResponse> {
    const endpoint = `/api/auth/update_user_info`;
    return this.httpClient.post<CommonResponse>(endpoint, data);
  }

  // ユーザー向けの username(メールアドレス) の変更を依頼
  // 認証メールを送信しユーザーがリンクを押下した時点で変更を確定する
  changeUserNameRequest(param: ChangeUserNameRequestParam): Observable<CommonResponse> {
    const endpoint = `/api/auth/change_user_name_request`;
    return this.httpClient.put<CommonResponse>(endpoint, param);
  }

  // ユーザー向けのパスワード確認
  checkUserPassword(data: CheckPasswordRequest): Observable<CommonResponse> {
    const endpoint = `/api/auth/check_user_password`;
    return this.httpClient.post<CommonResponse>(endpoint, data);
  }

}
