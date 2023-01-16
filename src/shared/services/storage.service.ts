import {environment} from '../../environments/environment';
import {LogService} from './log.service';
import {Injectable} from '@angular/core';

/**
 * Service for manipulating local storage
 */
@Injectable()
export class StorageService{
  ENC_KEY = 'sample';

  constructor(
    private logService: LogService
  ){}

  // Save string data to local storage
  set(key: string, value: string): void {
    if (environment.production) {
      // If not in a development environment, encrypt before saving
      // value = this.encryptService.encrypt(value, this.ENC_KEY);
    }
    this.logService.logDebug(`StorageService::set ${value} to key:${key}`);
    localStorage.setItem(key, value);
  }

  // Get string data from local storage
  get(key: string): string | null {
        let value = localStorage.getItem(key);
        if (environment.production && value) {
          // value = this.encryptService.decrypt(value, this.ENC_KEY);
        }
        this.logService.logDebug(`StorageService::get ${value} from key:${key}`);
        return value;
  }

  // Clear all local storage
  clear(): void {
        localStorage.clear();
        this.logService.logDebug(`StorageService::clear`);
  }

  // Delete string data from local storage成)
  remove(key: string): void {
        localStorage.removeItem(key);
        this.logService.logDebug(`StorageService::remove ${key}`);
  }

}
