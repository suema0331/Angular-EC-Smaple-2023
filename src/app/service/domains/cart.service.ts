import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_ID_SAMPLE } from 'src/app/extra/constants';
import { CartSummaryExt } from 'src/backend/dto/common/cart_summary_ext';
import { CartRestUserServiceExt } from 'src/backend/services/cart.rest.user.service.ext';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';

export interface CartItem {
  productId: string;
  quantity: number;
  dirtyFlag?: boolean;
}

export interface Cart {
  [productId: string]: CartItem;
}

export interface CartPriceInfo {
  totalProductPriceWithTax: number;
  totalProductPriceWithoutTax: number;
  numOfStoreProducts: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartCache: Cart = {}; // in-memory cache
  cartPriceInfo: CartPriceInfo = {totalProductPriceWithTax: 0, totalProductPriceWithoutTax: 0, numOfStoreProducts: 0};
  FLUSH_GRACE_PERIOD = 2;
  UPDATE_GRACE_PERIOD = 5;
  TIMER_STOPPED = -999;
  flushCacheCountDownTimer = this.TIMER_STOPPED;
  updatePriceInfoCountDownTimer = this.TIMER_STOPPED;

  constructor(
    private logService: LogService,
    private storageService: StorageService,
    // private authService: AuthService,
    private cartRestUserServiceExt: CartRestUserServiceExt,
  ) { }

  // ログインしている場合に１回だけ呼ばれる想定
  loadCartPriceInfoFromBackend(userId: string): void {
    this.logService.logDebug('[cart] loadCartPriceInfoFromBackend');
    // const deliveryType = DeliveryType.none;
    const coupon = '';

    // const receivingMethod = ReceivingMethod.none;
    // const calcPriceType = CalcPriceType.cartEstimation;
    this.cartRestUserServiceExt.getCart(
      userId,
      STORE_ID_SAMPLE,
      coupon,
    ).subscribe((data) => {
        // カートの合計価格＆数量 情報
        this.cartPriceInfo.totalProductPriceWithTax = data.estimate_price_set.total_product_price_with_tax;
        this.cartPriceInfo.totalProductPriceWithoutTax = data.estimate_price_set.total_product_price;
        this.cartPriceInfo.numOfStoreProducts = data.estimate_price_set.num_of_store_products;
      },
      () => {
        this.updatePriceInfoCountDownTimer = this.UPDATE_GRACE_PERIOD;
      });
  }

  getCartItem(productId: string): CartItem {
    this.logService.logDebug('[cart] getCartItem');
    const temp = this.cartCache[productId];
    if (temp === undefined) {
      // If not there, cache it.
      const newCache = {
        productId,
        quantity: 0,
        dirtyFlag: false,
        caution: 0
      };
      this.cartCache[productId] = newCache;
      return newCache;
    } else {
      return temp;
    }
  }

  getCartBeforeOrder(userId: string, inputCoupon?: string ): Observable<CartSummaryExt> {
    this.logService.logDebug('[cart] getCartBeforeOrder');
    const coupon = inputCoupon ? inputCoupon : '';
    return this.cartRestUserServiceExt.getCart(
      userId,
      STORE_ID_SAMPLE,
      coupon,
    );
    }

    incrementItem(productId: string): void {
    this.logService.logDebug('[cart] incrementItem');
    const temp = this.cartCache[productId];
    if (temp === undefined) {
      this.logService.logInfo('想定外のエラーが発生しました。CartServiceに登録されてない商品のカート数量を取得しようとしました。');
      return;
    }
    temp.quantity++;
    temp.dirtyFlag = true; // フラッシュが必要なキャッシュを示す。
    this.resetCountDownTimer();
    }

  resetCountDownTimer(): void {
    this.flushCacheCountDownTimer = this.FLUSH_GRACE_PERIOD;
  }


  // forceDecrementItem(productId: string): void {
  //   this.decrementItem(productId);
  //   this.forceFlushCache();
  // }

  decrementItem(productId: string): void {
    this.logService.logDebug('[cart] decrementItem');
    const temp = this.cartCache[productId];
    if (temp === undefined) {
      this.logService.logInfo('想定外のエラーが発生しました。CartServiceに登録されてない商品のカート数量を取得しようとしました。');
      return;
    }
    temp.quantity--;
    if (temp.quantity < 0) {
      temp.quantity = 0;
    }
    temp.dirtyFlag = true; // フラッシュが必要なキャッシュを示す。
    this.resetCountDownTimer();
  }

  decrementAllItem(productId: string): void {
    this.logService.logDebug('[cart] decrementAllItem');
    const temp = this.cartCache[productId];
    if (temp === undefined) {
      this.logService.logInfo('想定外のエラーが発生しました。CartServiceに登録されてない商品のカート数量を取得しようとしました。');
      return;
    }
    temp.quantity = 0;
    if (temp.quantity < 0) {
      temp.quantity = 0;
    }
    temp.dirtyFlag = true; // フラッシュが必要なキャッシュを示す。

    this.flushCacheCountDownTimer = 0;
  }

  getCartPriceInfo(): CartPriceInfo {
    return this.cartPriceInfo;
  }

}
