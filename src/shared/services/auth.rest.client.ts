import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import { NotificationService } from './notification.service';

type RestOption = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any | null;
};

const baseUrl = environment.remote ? environment.API_AUTH_URL : '';

@Injectable()
export class AuthRestClient{


  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
    // private notificationService: NotificationService
  ){}

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status >= 500 || err.status === 0 ) { // サーバーダウンの場合、504 (Gateway Timeout)で落ちる err.status === 0 はブラウザ側のエラー
      // this.notificationService.openNetworkErrorToast();
      return throwError('サーバーと通信出来ないエラーが発生しました。');
    } else if (err.status === 404 ) { // 404の場合トーストを出さない
      this.logService.logDebug('404エラーが発生しました');
      return throwError('404エラーが発生しました');
    } else {
      return throwError('何か不明な障害が発生しました。');
    }
  }

  // Http Get (自動生成)
  get<T>(url: string, options?: RestOption): Observable<T> {
    this.logService.logDebug(`RestClient::get ${url} option: ${JSON.stringify(options)}`);
    return new Observable<T>((obs) => {
      this.httpClient.get<T>(baseUrl + url, options)
        .pipe(
          catchError(err => this.handleError(err))
        )
        .subscribe((data) => {
          obs.next(data);
          obs.complete();
        });
    });
  }

  // Http put (自動生成)
  put<T>(url: string, body: any | null, options?: RestOption): Observable<T> {
    this.logService.logDebug(`RestClient::put ${url} body: ${JSON.stringify(body)} option: ${JSON.stringify(options)}`);
    return new Observable<T>((obs) => {
      this.httpClient.put<T>(baseUrl + url, body, options)
        .pipe(
          catchError(err => this.handleError(err))
        )
        .subscribe((data) => {
          obs.next(data);
          obs.complete();
        });
    });
  }

  // Http post (自動生成)
  post<T>(url: string, body: any | null, options?: RestOption): Observable<T> {
    this.logService.logDebug(`RestClient::post ${url} body: ${JSON.stringify(body)} option: ${JSON.stringify(options)}`);
    return new Observable<T>((obs) => {
      this.httpClient.post<T>(baseUrl + url, body, options)
        .pipe(
          catchError(err => this.handleError(err))
        )
        .subscribe((data) => {
          obs.next(data);
          obs.complete();
        });
    });
  }

  // Http delete (自動生成)
  delete<T>(url: string, options?: RestOption): Observable<T> {
    this.logService.logDebug(`RestClient::delete ${url} option: ${JSON.stringify(options)}`);
    return new Observable<T>((obs) => {
      this.httpClient.delete<T>(baseUrl + url, options)
        .pipe(
          catchError( err => this.handleError(err))
        )
        .subscribe((data) => {
          obs.next(data);
          obs.complete();
        });
    });
  }

}
