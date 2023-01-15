import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
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

  cartPriceInfo: CartPriceInfo =  this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
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
      return;
    }
    const toastImagePath = $event.product_images[0].small
      ?  $event.product_images[0].small
      : '/assets/product/no-image-small.jpg';

    this.notificationService.openAddProductToCartImageToast(
      toastImagePath,
      $event.producing_area ? $event.producing_area : '',
      $event.product_name,
      $event.brand ? $event.brand : '',
    );
    this.cartService.incrementItem($event.store_product_id, $event.store_price);
  }

  clickMinusHandler($event: StoreProductExt): void {
    this.cartService.decrementItem($event.store_product_id);
  }

  cartBtnHandler(): void{
    // this.locationService.navigateTo4_12();
  }

}
