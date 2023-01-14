import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { AuthService } from 'src/shared/services/auth.service';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-pastitem',
  templateUrl: './pastitem.component.html',
  styleUrls: ['./pastitem.component.scss']
})
export class PastitemComponent {
  screenName = 'PastitemComponent';
  screenId = '3_3';
  productList: Array<StoreProductExt> = [];

  userId: string | undefined = '';

  cartPriceInfo: CartPriceInfo = {totalProductPriceWithTax: 0, totalProductPriceWithoutTax: 0, numOfStoreProducts: 0 };

  isLoggedIn = false;


  constructor(
    private locationService: LocationService,
    private logService: LogService,
    private cartService: CartService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {

    this.isLoggedIn = this.authService.isLoggedIn;
    // this.isLoggedOut$ = this.authService.isLoggedOut$();

    // ローカルストレージのユーザーIDを取得
    // this.userId = this.appService.getUserIdLoggedIn();

    if (!this.isLoggedIn) {
      // alert('Please log in');
      // this.locationService.navigateTo('/login?return=/mypage/pastItem');
      return;
    } else {
      // 購入商品取得
      // this.appService.getPurchaseHistory(this.userId).subscribe(
      //   (res) => {

      //     // 売り切れ商品を最後に並び替える
      //     res.sort((a , b ) => {
      //       if (a.product_status < b.product_status) { return -1; }
      //       else if (a.product_status > b.product_status) { return 1; }
      //       return 0;
      //     });
      //     res.forEach((storeProductExt) => {
      //       this.productList.push(storeProductExt);
      //     });
      //     this.isLoaded = true;
      //   });

      // // 価格などのカート情報を取得
      // this.cartPriceInfo = this.cartService.getCartPriceInfo();
    }

  }

  clickPlusHandler($event: StoreProductExt): void {
    if ($event.cart_quantity >= CONSTRAINT_MAX) {
      alert('最大50点までしか購入できません');
      return;
    }
    this.cartService.incrementItem($event.store_product_id);
  }

  clickMinusHandler($event: StoreProductExt): void {
    this.cartService.decrementItem($event.store_product_id);
  }

  cartBtnHandler(): void{
    // this.locationService.navigateTo4_12();
  }

}
