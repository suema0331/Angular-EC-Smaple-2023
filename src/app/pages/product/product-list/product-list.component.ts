import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { ProductService } from 'src/backend/services/product.service';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  screenName = 'ProductListComponent';
  screenId = '2_1';

  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  productList: Array<StoreProductExt> = [];
  productListSubscription: Subscription | undefined;

  links = this.locationService.links;
  isMenuOpen = false;

  constructor(
    public locationService: LocationService,
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get up to 6 products in order of registration
    this.productListSubscription = this.productService
      .getProducts()
      .subscribe((data) => (this.productList = data));
  }

  ngOnDestroy(): void {
    this.productListSubscription?.unsubscribe();
  }

  openMenuHandler(): void {
    this.isMenuOpen = true;
  }

  closeMenuHandler($event: boolean): void {
    if ($event) this.isMenuOpen = false;
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
