import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class LogService{
  constructor(){}

  // ログ情報出力 (自動生成)
  logInfo(msg: string | object): void {
      // console.log(`${msg}`);
  }

  // ログ情報出力 (自動生成)
  logDebug(msg: string | object): void {
    if (!environment.production) {
      console.log(`[DEBUG] ${msg}`);
    }
  }

  logError(msg: string | object): void {
    if (!environment.production) {
      // console.log(`[ERROR] ${msg}`);
    }
  }

  // ログ出力 - スタックトレース
  logStackTrace(msg: string | object): void {
    if (!environment.production) {
      // console.trace(`[TRACE] ${msg}`);
    }
  }

  // ログ出力 - トレース情報
  logTrace(msg: string | object): void {
    if (!environment.production) {
      console.log(`[TRACE] ${msg}`);
    }
  }
}
