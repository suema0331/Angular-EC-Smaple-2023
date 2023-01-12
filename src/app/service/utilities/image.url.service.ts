import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';

export enum SizeType {
  small = 0,
  medium = 1
}

@Injectable()
export class ImageUrlService{
  constructor(){}

  // 将来的に顧客が増えた場合はCroudFrontを使用してS3の中に保存されているオブジェクトから取得する
  getImageUrl(id: string, imgUrl: string, sizeType?: SizeType): string {
    // if (environment.IMAGE_DL_FROM_S3){
      // return this.getImageUrlForS3(id, imgUrl, sizeType);
    // } else {
      return this.getImageUrlForBackend(imgUrl);
    // }
  }

  getImageUrlForBackend(imgUrl: string): string {
    let tmpUrl = `${environment.API_URL}/res/images`;
    if (imgUrl.slice(0, 1) !== '/'){
      tmpUrl = tmpUrl + '/';
    }
    return tmpUrl + imgUrl;
  }

  // getImageUrlForS3(id: string , imgUrl: string, sizeType?: SizeType): string {
  // }

}
