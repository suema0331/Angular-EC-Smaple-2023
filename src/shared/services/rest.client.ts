import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import { NotificationService } from './notification.service';

type JsonRestOption = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any | null;
};

type BlobRestOption = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType: 'blob';
  withCredentials?: boolean;
};

const baseUrl = environment.remote ? environment.API_URL : '';

@Injectable()
export class RestClient{

  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
    // private authService: AuthService,
    // private notificationService: NotificationService
  ){}

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status >= 500 || err.status === 0 ) { // サーバーダウンの場合、504 (Gateway Timeout)で落ちる err.status === 0 はブラウザ側のエラー
      // this.notificationService.openNetworkErrorToast();
      return throwError('サーバーと通信出来ないエラーが発生しました。');
    } else if (err.status === 404 ) { // 404の場合トーストを出さない
      this.logService.logDebug('404エラーが発生しました');
      return throwError('404エラーが発生しました');
    } else if (err.error.message.includes('注文締め切り時間') && err.error.status === 105){
        return throwError(err);
    } else if (err.error.message.includes('注文の作成中に不明なエラーが発生しました。')){
          return throwError(err);
    } else {
        return throwError('何か不明な障害が発生しました。');
    }
  }

  // Http Get (自動生成)
  get<T>(url: string, options?: JsonRestOption): Observable<T> {
    this.logService.logDebug(`RestClient::get ${url} option: ${JSON.stringify(options)}`);
    // if (this.authService.isNowRefreshing()) {
    //   return new Observable<T>((obs) => {
    //     const refreshStateObserver = this.authService.getRefreshingState().subscribe(currentState => {
    //       if (currentState === 0) {
    //         this.httpClient.get<T>(baseUrl + url, options)
    //           .pipe(
    //             catchError(err => this.handleError(err))
    //           )
    //           .subscribe((data) => {
    //             obs.next(data);
    //             obs.complete();
    //             refreshStateObserver.unsubscribe();
    //           });
    //       }
    //     });
    //   });
    // } else {
      return this.httpClient.get<T>(baseUrl + url, options)
        .pipe(
          catchError(err => this.handleError(err))
        );
    // }
  }

  // Http Get (自動生成)
  getBlob(url: string, options: BlobRestOption): Observable<Blob> {
    this.logService.logDebug(`RestClient::getBlob ${url} option: ${JSON.stringify(options)}`);
    return this.httpClient.get(baseUrl + url, options);
  }

  // Http put (自動生成)
  put<T>(url: string, body: any | null, options?: JsonRestOption): Observable<T> {
    this.logService.logDebug(`RestClient::put ${url} body: ${JSON.stringify(body)} option: ${JSON.stringify(options)}`);
    // if (this.authService.isNowRefreshing()) {
    //   return new Observable<T>((obs) => {
    //     const refreshStateObserver = this.authService.getRefreshingState().subscribe(currentState => {
    //       if (currentState === 0) {
    //         this.httpClient.put<T>(baseUrl + url, body, options)
    //           .pipe(
    //             catchError(err => this.handleError(err))
    //           )
    //           .subscribe((data) => {
    //             obs.next(data);
    //             obs.complete();
    //             refreshStateObserver.unsubscribe();
    //           });
    //       }
    //     });
    //   });
    // } else {
      return this.httpClient.put<T>(baseUrl + url, body, options)
        .pipe(catchError(err => this.handleError(err)));
    // }
  }

  // Http post (自動生成)
  post<T>(url: string, body: any | null, options?: JsonRestOption): Observable<T> {
    this.logService.logDebug(`RestClient::post ${url} body: ${JSON.stringify(body)} option: ${JSON.stringify(options)}`);
    // if (this.authService.isNowRefreshing()) {
    //   return new Observable<T>((obs) => {
    //     const refreshStateObserver = this.authService.getRefreshingState()
    //       .pipe(
    //         catchError(err => this.handleError(err))
    //       )
    //       .subscribe(currentState => {
    //         if (currentState === 0) {
    //           this.httpClient.post<T>(baseUrl + url, body, options)
    //             .pipe(
    //               catchError(err => this.handleError(err))
    //             )
    //             .subscribe((data) => {
    //               obs.next(data);
    //               obs.complete();
    //               refreshStateObserver.unsubscribe();
    //             });
    //         }
    //       });
    //   });
    // } else {
      return this.httpClient.post<T>(baseUrl + url, body, options)
        .pipe(catchError(err => this.handleError(err)));
    // }
  }

  // Http delete (自動生成)
  delete<T>(url: string, options?: JsonRestOption): Observable<T> {
    this.logService.logDebug(`RestClient::delete ${url} option: ${JSON.stringify(options)}`);
    // if (this.authService.isNowRefreshing()) {
    //   return new Observable<T>((obs) => {
    //     const refreshStateObserver = this.authService.getRefreshingState().subscribe(currentState => {
    //       if (currentState === 0) {
    //         this.httpClient.delete<T>(baseUrl + url, options)
    //           .pipe(
    //             catchError(err => this.handleError(err))
    //           )
    //           .subscribe((data) => {
    //             obs.next(data);
    //             obs.complete();
    //             refreshStateObserver.unsubscribe();
    //           });
    //       }
    //     });
    //   });
    // } else {
      return this.httpClient.delete<T>(baseUrl + url, options)
        .pipe(catchError(err => this.handleError(err)));
    // }
  }

}
