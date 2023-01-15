import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORAGE_KEY_CART, STORE_ID_SAMPLE } from 'src/app/extra/constants';
import { CartSummaryExt } from 'src/backend/dto/common/cart_summary_ext';
import { CartRestUserServiceExt } from 'src/backend/services/cart.rest.user.service.ext';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';
import { PriceService } from '../utilities/price-service.service';

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
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
  updatePriceInfoCountDownTimer = this.TIMER_STOPPED;

  constructor(
    private logService: LogService,
    private storageService: StorageService,
    // private authService: AuthService,
    private cartRestUserServiceExt: CartRestUserServiceExt,
    private priceService: PriceService,
  ) {
    // Retrieve cart data from local storage if available and display it in the view.
    this.loadCartCacheFromStorage();
    // Calculate total amount and total quantity of cart contents.
    this.calculateCartPriceInfo(this.getValidCache());
  }

  // ログインしている場合に１回だけ呼ばれる想定
  // loadCartPriceInfoFromBackend(userId: string): void {
  //   this.logService.logDebug('[cart] loadCartPriceInfoFromBackend');
  //   // const deliveryType = DeliveryType.none;
  //   const coupon = '';

  //   // const receivingMethod = ReceivingMethod.none;
  //   // const calcPriceType = CalcPriceType.cartEstimation;
  //   this.cartRestUserServiceExt.getCart(
  //     userId,
  //     STORE_ID_SAMPLE,
  //     coupon,
  //   ).subscribe((data) => {
  //       // カートの合計価格＆数量 情報
  //       this.cartPriceInfo.totalProductPriceWithTax = data.estimate_price_set.total_product_price_with_tax;
  //       this.cartPriceInfo.totalProductPriceWithoutTax = data.estimate_price_set.total_product_price;
  //       this.cartPriceInfo.numOfStoreProducts = data.estimate_price_set.num_of_store_products;
  //     },
  //     () => {
  //       this.updatePriceInfoCountDownTimer = this.UPDATE_GRACE_PERIOD;
  //     });
  // }

  loadCartCacheFromStorage(): void {
    this.logService.logDebug('[cart] loadCartCacheFromStorage');
    const strCartCache = this.storageService.get(STORAGE_KEY_CART);
    if (strCartCache === null) {
      this.logService.logDebug('[cart] No data was found in local storage.');
      return;
    }
    this.logService.logDebug('[cart] Retrieve data from local storage.');
    const validCache: CartItem[] = JSON.parse(strCartCache);
    this.cartCache = {};
    if ( validCache && validCache.length > 0) {
      validCache.forEach((item) => {
        this.cartCache[item.productId] = item;
      });
    }
    console.log("this.cartCache")
    console.log(this.cartCache)
  }

   getValidCache(): CartItem[] {
    const validCache: CartItem[] = [];
    Object.keys(this.cartCache).forEach(key => {
      const temp = this.cartCache[key];
      if (temp.quantity > 0 && temp.dirtyFlag) {
        validCache.push(temp);
      }
    });
    return validCache;
   }

  saveCartCacheToStorage(): void {
    this.logService.logDebug('[cart] saveCartCacheToStorage');
    const validCache = this.getValidCache();
    console.log("validCache")
    console.log(validCache)
    this.calculateCartPriceInfo(validCache)
    this.storageService.set(STORAGE_KEY_CART, JSON.stringify(validCache));
  }

  calculateCartPriceInfo(cartItem: CartItem[]): void {
    let sumPrice = 0;
    let sumQuantity = 0;
    cartItem.forEach((item) => {
      sumPrice += item.price * item.quantity
      sumQuantity += item.quantity
    })
    // Calculate cart total price & quantity info
    this.cartPriceInfo.totalProductPriceWithoutTax = sumPrice;
    this.cartPriceInfo.numOfStoreProducts = sumQuantity;
    this.cartPriceInfo.totalProductPriceWithTax = this.priceService.calculateTaxedValue(sumPrice);
    console.log(sumPrice)
    console.log(sumQuantity)
    console.log(this.cartPriceInfo.totalProductPriceWithTax)
  }

  incrementItem(productId: string , storePrice: number): void {
    this.logService.logDebug('[cart] incrementItem');
    const temp = this.cartCache[productId];
    temp.price = storePrice;
    temp.quantity++;
    temp.dirtyFlag = true; // Indicates a cache that needs to be updated (flushed) to the backend.
    this.saveCartCacheToStorage();
  }

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
    temp.dirtyFlag = true; // Indicates a cache that needs to be updated (flushed) to the backend.

    this.saveCartCacheToStorage();
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
    temp.dirtyFlag = true;

  }

  getCartPriceInfo(): CartPriceInfo {
    return this.cartPriceInfo;
  }

  getCartItem(productId: string): CartItem {
    this.logService.logDebug('[cart] getCartItem');
    const temp = this.cartCache[productId];
    if (temp === undefined) {
      // If not there, cache it.
      const newCache = {
        productId,
        quantity: 0,
        price: 0,
        dirtyFlag: false,
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



}
