import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { OrderService } from 'src/backend/services/order.service';
import { AuthService } from 'src/app/service/domains/auth.service';

@Component({
  selector: 'app-pastitem',
  templateUrl: './pastitem.component.html',
  styleUrls: ['./pastitem.component.scss'],
})
export class PastitemComponent {
  screenName = 'PastitemComponent';
  screenId = '3_3';
  productList: Array<StoreProductExt> = [];
  orderSubscription: Subscription | undefined;

  currentUser = this.authService.currentUser;
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private orderSrrvice: OrderService
  ) {}

  ngOnInit(): void {
    // Get Purchased products
    this.orderSubscription = this.orderSrrvice
      .getOrderedProducts(this.currentUser.uid)
      .subscribe((data) => {
        const productIds = new Map<string, number>();

        data.forEach((order) => {
          order.order_products.forEach((p) => {
            if (productIds.has(p.store_product_id)) {
              productIds.set(
                p.store_product_id,
                Number(productIds.get(p.store_product_id)) + 1
              );
            } else {
              productIds.set(p.store_product_id, 1);
              this.productList.push(p);
            }
          });
        });
      });
  }

  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
  }

  clickPlusHandler($event: StoreProductExt): void {
    if ($event.cart_quantity >= CONSTRAINT_MAX) {
      return;
    }
    const toastImagePath = $event.product_images[0].small
      ? $event.product_images[0].small
      : '/assets/product/no-image-small.jpg';

    this.notificationService.openAddProductToCartImageToast(
      toastImagePath,
      $event.producing_area ? $event.producing_area : '',
      $event.product_name,
      $event.brand ? $event.brand : ''
    );
    this.cartService.incrementItem($event.store_product_id, $event.store_price);
  }

  clickMinusHandler($event: StoreProductExt): void {
    this.cartService.decrementItem($event.store_product_id);
  }
}
