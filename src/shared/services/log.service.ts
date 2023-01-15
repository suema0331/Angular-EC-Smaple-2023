import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class LogService{
  constructor(){}

  logInfo(msg: string | object): void {
      console.log(`${msg}`);
  }

  logDebug(msg: string | object): void {
    if (!environment.production) {
      console.log(`[DEBUG] ${msg}`);
    }
  }

  logError(msg: string | object): void {
    if (!environment.production) {
      console.log(`[ERROR] ${msg}`);
    }
  }

  logStackTrace(msg: string | object): void {
    if (!environment.production) {
      console.trace(`[TRACE] ${msg}`);
    }
  }

  logTrace(msg: string | object): void {
    if (!environment.production) {
      console.log(`[TRACE] ${msg}`);
    }
  }
}
