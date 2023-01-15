import {Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';

export enum SizeType {
  small = 0,
  medium = 1,
  master = 2
}

@Injectable()
export class ImageUrlService{
  constructor(){}

  /**
   * Not used at this time,
   * but if more customers are added in the future, they will be retrieved from objects stored in S3 using CroudFront
   *  */
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
