import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { AuthService } from 'src/shared/services/auth.service';

const searchClient = algoliasearch(
  'CF1WVZ4JQG',
  '488ec6355da8fef55477fc85d464a645'
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  screenName = 'SearchComponent';
  screenId = '1_2';

  cartPriceInfo: CartPriceInfo =  this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private locationService: LocationService,
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {}
  // config for algoliasearch
  config = {
    indexName: 'angular-ec-2023',
    searchClient
  };

  backToTopHandler(): void{
    this.locationService.navigateTo1_1();
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
}
