import {environment} from '../../environments/environment';
// import {EncryptService} from './encrypt.service';
import {LogService} from './log.service';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService{
  // 暗号・復号キー
  ENC_KEY = '6h1dPuYLLHg9z3baf6nqqJCisYkonOsM';

  constructor(
    // private encryptService: EncryptService,
    private logService: LogService
  ){}

  // ローカルストレージ に文字列データを保存 (自動生成)
  set(key: string, value: string): void {
    if (environment.production) {
      // value = this.encryptService.encrypt(value, this.ENC_KEY);
    }
    this.logService.logDebug(`StorageService::set ${value} to key:${key}`);
    localStorage.setItem(key, value);
  }

  // ローカルストレージ から 文字列データを取得 (自動生成)
  get(key: string): string | null {
        let value = localStorage.getItem(key);
        if (environment.production && value) {
          // value = this.encryptService.decrypt(value, this.ENC_KEY);
        }
        this.logService.logDebug(`StorageService::get ${value} from key:${key}`);
        return value;
  }

  // ローカルストレージ を全クリア (自動生成)
  clear(): void {
        localStorage.clear();
        this.logService.logDebug(`StorageService::clear`);
  }

  // ローカルストレージ から文字列データを削除 (自動生成)
  remove(key: string): void {
        localStorage.removeItem(key);
        this.logService.logDebug(`StorageService::remove ${key}`);
  }

}
