import { SystemStatusResponse } from '../dto/common/system_status_response';
import { RestClient } from '../../shared/services/rest.client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemStatusRestUserServiceExt{

  constructor(
    private httpClient: RestClient
  ){}

  // システムステータスの取得
  getSystemStatus(): Observable<SystemStatusResponse> {
    const endpoint = `/api/user/system_configurations_ext/system_status_ext`;
    return this.httpClient.get<SystemStatusResponse>(endpoint);
  }

}
