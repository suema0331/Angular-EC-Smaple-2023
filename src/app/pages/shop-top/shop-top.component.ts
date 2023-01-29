import { Component, ViewChild } from '@angular/core';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { STORAGE_KEY_SHOWN_ONBOARD } from 'src/app/extra/constants';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { StoreTopMessage } from 'src/backend/dto/common/store_top_message';
import { AuthService } from 'src/app/service/domains/auth.service';
import { StorageService } from 'src/shared/services/storage.service';
import { ShopGuideComponent } from '../shop-guide/shop-guide.component';
import { ProductService } from 'src/backend/services/product.service';
import { MessageService } from 'src/backend/services/message.service';

@Component({
  selector: 'app-shop-top',
  templateUrl: './shop-top.component.html',
  styleUrls: ['./shop-top.component.scss'],
})
export class ShopTopComponent {
  screenName = 'ShopTopComponent';
  screenId = '1_1';

  links = this.locationService.links;

  onboardModalRef: MdbModalRef<ShopGuideComponent> | undefined;

  recommendedProductList: Array<StoreProductExt> = [];

  storeMessage = {} as StoreTopMessage;
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  messageSubscription?: Subscription;
  recommendedSubscription?: Subscription;
  isMenuOpen = false;

  @ViewChild('mdbCarousel') mdbCarousel!: MdbCarouselComponent;
  constructor(
    private locationService: LocationService,
    private modalService: MdbModalService,
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Modal only when member registration succeeds.
    const hasShowOnboard = this.storageService.get(STORAGE_KEY_SHOWN_ONBOARD);
    if (hasShowOnboard === 'false') {
      this.openModal();
      this.storageService.set(STORAGE_KEY_SHOWN_ONBOARD, 'true');
    }
    // Get up to 6 products in order of registration
    this.recommendedSubscription = this.productService
      .getProducts(6)
      .subscribe((data) => {
        this.recommendedProductList = data;
      });
    // Get messages from the store that can be written by the store staff.
    this.messageSubscription = this.messageService
      .getMessages()
      .subscribe((message) => {
        if (message[0]) {
          this.storeMessage = message[0];
        }
      });
    // Possibly store encrypted UserID or token expiration date in local store and load it
    this.authService.getAuthState().subscribe((user) => {
      console.log(user);
      if (user) {
        this.isLoggedIn = user.uid ? true : false;
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.recommendedSubscription?.unsubscribe();
  }

  openModal(): void {
    this.onboardModalRef = this.modalService.open(ShopGuideComponent, {
      modalClass: 'modal-dialog-centered',
    });
  }

  logoutHandler(): void {
    this.authService
      .logout()
      .then(() => {
        alert('Successfully logged out!');
        this.cartService.clearCart();
        this.cartService.clearCartCacheFromStorage();
        this.isLoggedIn = this.authService.isLoggedIn;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openMenuHandler(): void {
    this.isMenuOpen = true;
  }

  closeMenuHandler($event: boolean) {
    if ($event) this.isMenuOpen = false;
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  clickPlusHandler($event: StoreProductExt): void {
    if (this.isLoggedIn) {
      const toastImagePath = $event.product_images[0].small
        ? $event.product_images[0].small
        : '/assets/product/no-image-small.jpg';

      this.notificationService.openAddProductToCartImageToast(
        toastImagePath,
        $event.producing_area ? $event.producing_area : '',
        $event.product_name,
        $event.brand ? $event.brand : ''
      );
    }
    this.cartService.incrementItem($event.store_product_id, $event.store_price);
  }

  clickMinusHandler($event: StoreProductExt): void {
    this.cartService.decrementItem($event.store_product_id);
  }
}
