import { Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, Subscription } from 'rxjs';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { StoreTopMessage } from 'src/backend/dto/common/store_top_message';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth.service';
import { ShopGuideComponent } from '../shop-guide/shop-guide.component';
import { STORAGE_KEY_SHOWN_ONBOARD } from 'src/app/extra/constants';
import { StorageService } from 'src/shared/services/storage.service';

@Component({
  selector: 'app-shop-top',
  templateUrl: './shop-top.component.html',
  styleUrls: ['./shop-top.component.scss']
})
export class ShopTopComponent {
  screenName = 'ShopTopComponent';
  screenId = '1_1';

  onboardModalRef: MdbModalRef<ShopGuideComponent> | undefined;

  isScroll = false;
  isScrollDown = false;
  currentPageYOffset = 0;

  recommendedProductList$: Observable<StoreProductExt[]>;
  storeMessage = {} as StoreTopMessage;
  cartPriceInfo: CartPriceInfo =  this.cartService.getCartPriceInfo();
  currentUser = this.authService.currentUser
  isLoggedIn = this.authService.isLoggedIn;

  messageSubscription?: Subscription;

  @ViewChild('mdbCarousel') mdbCarousel!: MdbCarouselComponent;
  constructor(
    private locationService: LocationService,
    private modalService: MdbModalService,
    private cartService: CartService,
    private afs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storageService: StorageService,
  ) {
    // Get up to 6 products in order of registration
    const productCollection = this.afs.collection<StoreProductExt>('products', (ref) => ref.limit(6));
    this.recommendedProductList$ = productCollection.valueChanges();

    // Get messages from the store that can be written by the store staff.
    const storeMessageCollection = this.afs.collection<StoreTopMessage>('store-messages', (ref) => ref.limit(1));
    this.messageSubscription = storeMessageCollection.valueChanges().subscribe(message => {
      if (message[0]) {
        this.storeMessage = message[0]
      }
    });
  }

  ngOnInit(): void{
    // Modal only when member registration succeeds.
    const hasShowOnboard = this.storageService.get(STORAGE_KEY_SHOWN_ONBOARD);
    if (hasShowOnboard === 'false'){
      this.openModal();
      this.storageService.set(STORAGE_KEY_SHOWN_ONBOARD, 'true');
    }
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
  }

  openModal(): void {
    this.onboardModalRef = this.modalService.open(ShopGuideComponent,
    {  modalClass: 'modal-dialog-centered' }
    );
  }

  logoutHandler(): void{
    this.authService.logout();
    alert('Successfully logged out!');
    this.locationService.navigateTo1_1();
  }

  clickPlusHandler($event: StoreProductExt): void {
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

  navigateToMypageHandler(): void{
    this.locationService.navigateTo3_1();
  }

  navigateToProductList(): void{
    this.locationService.navigateTo2_1();

  }

  navigateToSearchHandler(): void{
    this.locationService.navigateTo1_2();
  }

  navigateToFavoriteHandler(): void{
    this.locationService.navigateTo3_2();
  }

  navigateToPastitemHandler(): void{
    this.locationService.navigateTo3_3();
  }

  cartBtnHandler(): void{
    this.locationService.navigateTo4_1();
  }

  loginHandler(): void{
    this.locationService.navigateTo('/login');
  }

  navigateToShopHandler(): void{
    if (environment.production){
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    } else {
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    }
  }

  navigateToPrivacyHandler(): void{
    if (environment.production){
      window.open(`https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`, '_blank');
    } else {
      window.open(`https://www.linkedin.com/in/haruno-suematsu-b20a03235/`, '_blank');
    }
  }

  navigateToComplianceHandler(): void{
    if (environment.production){
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    } else {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    }
  }
}
