
import {Injectable} from '@angular/core';

@Injectable()
export class UtilService{

  public getCurrentDateTime(): number{
    const now = new Date();
    const temp = now.getFullYear() + this.zeroPadding(now.getMonth() + 1) + this.zeroPadding(now.getDate()) +
      this.zeroPadding(now.getHours()) + this.zeroPadding(now.getMinutes());
    return Number(temp);
  }

  private zeroPadding(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
