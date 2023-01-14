import { SystemStatusResponse } from '../dto/common/system_status_response';
import { RestClient } from '../../shared/services/rest.client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemStatusRestUserServiceExt{

  constructor(
    private httpClient: RestClient
  ){}

  // Get the status of the entire system, including multiple applications, such as the user application, admin application.
  getSystemStatus(): Observable<SystemStatusResponse> {
    const endpoint = `/api/user/system_configurations_ext/system_status_ext`;
    return this.httpClient.get<SystemStatusResponse>(endpoint);
  }

}
