import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { ApplicationService } from 'src/app/service/application.service';
import { AuthService } from 'src/app/service/domains/auth.service';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  screenName = 'FavoriteComponent';
  screenId = '3_2';

  productList: Array<StoreProductExt> = [];
  productListSubscription: Subscription | undefined;

  userId: string | undefined = '';
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.productListSubscription = this.applicationService
      .getFavoriteProducts()
      .subscribe(
        (data) => (this.productList = Array.from(Object.values(data)))
      );
  }

  ngOnDestroy(): void {
    this.productListSubscription?.unsubscribe();
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
