import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
import { AuthService } from 'src/shared/services/auth.service';
import { StorageService } from 'src/shared/services/storage.service';
import { ShopGuideComponent } from '../shop-guide/shop-guide.component';

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
  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;

  messageSubscription?: Subscription;
  recommendedSubscription?: Subscription;
  isMenuOpen = false;

  @ViewChild('mdbCarousel') mdbCarousel!: MdbCarouselComponent;
  constructor(
    private locationService: LocationService,
    private modalService: MdbModalService,
    private cartService: CartService,
    private afs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService
  ) {
    // Get up to 6 products in order of registration
    const productCollection = this.afs.collection<StoreProductExt>(
      'products',
      (ref) => ref.limit(6)
    );
    this.recommendedSubscription = productCollection
      .valueChanges()
      .subscribe((data) => {
        this.recommendedProductList = data;
      });
    // Get messages from the store that can be written by the store staff.
    const storeMessageCollection = this.afs.collection<StoreTopMessage>(
      'store-messages',
      (ref) => ref.limit(1)
    );
    this.messageSubscription = storeMessageCollection
      .valueChanges()
      .subscribe((message) => {
        if (message[0]) {
          this.storeMessage = message[0];
        }
      });
  }

  ngOnInit(): void {
    // Modal only when member registration succeeds.
    const hasShowOnboard = this.storageService.get(STORAGE_KEY_SHOWN_ONBOARD);
    if (hasShowOnboard === 'false') {
      this.openModal();
      this.storageService.set(STORAGE_KEY_SHOWN_ONBOARD, 'true');
    }
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
        this.currentUser = this.authService.currentUser;
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
    this.currentUser = this.authService.currentUser;
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
