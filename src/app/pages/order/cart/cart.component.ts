import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, Subscription, map } from 'rxjs';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { CartToOrder } from 'src/backend/dto/common/cart_to_order';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { StoreTopMessage } from 'src/backend/dto/common/store_top_message';
import { AuthService } from 'src/shared/services/auth.service';
import { ConfirmCartClearModalComponent } from '../confirm-cart-clear-modal/confirm-cart-clear-modal.component';
import { ConfirmOrderModalComponent } from '../confirm-order-modal/confirm-order-modal.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  currentUser = this.authService.currentUser;
  userCart = [] as StoreProductExt[];
  cartPriceInfo: CartPriceInfo = {
    totalProductPriceWithTax: 0,
    totalProductPriceWithoutTax: 0,
    numOfStoreProducts: -1,
  };

  checkCartClearModalRef:
    | MdbModalRef<ConfirmCartClearModalComponent>
    | undefined;
  confirmOrderModalRef: MdbModalRef<ConfirmOrderModalComponent> | undefined;
  overCartConstraintMax = false;

  storeMessage = {} as StoreTopMessage;
  messageSubscription?: Subscription;
  productSubscription?: Subscription;

  constructor(
    public locationService: LocationService,
    private location: Location,
    private cartService: CartService,
    private modalService: MdbModalService,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
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
    // Get Products in the Cart
    const cartCache = this.cartService.getValidCache();
    cartCache.forEach((cart) => {
      if (cart.productId) {
        this.productSubscription = this.afs
          .collection<StoreProductExt>('products', (ref) =>
            ref.where('store_product_id', '==', cart.productId)
          )
          .snapshotChanges()
          .pipe(
            map((actions) =>
              actions.map((a) => {
                const data = a.payload.doc.data() as StoreProductExt;
                const id = a.payload.doc.id;
                return { docmentId: id, ...data };
              })
            )
          )
          .subscribe((data) => {
            // console.log("🌟subscribed Product data")
            console.log(data);
            if (!this.userCart) return;
            if (data[0]) this.userCart?.push(data[0] as StoreProductExt);
          });
      }
    });
    this.cartPriceInfo = this.cartService.getCartPriceInfo();
  }
  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }

  clickPlusHandler($event: StoreProductExt): void {
    this.cartService.incrementItem($event.store_product_id, $event.store_price);
  }

  clickMinusHandler($event: StoreProductExt): void {
    if ($event.cart_quantity === 1) {
      this.clickRemoveAllHandler($event);
      return;
    }
    this.cartService.decrementItem($event.store_product_id);
  }

  clickRemoveAllHandler($event: StoreProductExt): void {
    $event.cart_quantity = 0;
    this.cartService.decrementAllItem($event.store_product_id);
    this.userCart = this.userCart.filter(
      (s) => s.store_product_id !== $event.store_product_id
    );
    this.cartPriceInfo = this.cartService.getCartPriceInfo();
  }

  emptyCartHandler(): void {
    if (this.cartPriceInfo.numOfStoreProducts === 0) {
      alert('There are no items in your cart.');
    }
    this.openConfirmCartClearModal().subscribe((selected) => {
      if (selected) {
        // Delete all in-memory cart information
        this.cartService.clearCart();
        this.cartService.clearCartCacheFromStorage();
        this.userCart = {} as StoreProductExt[];
        this.cartPriceInfo = this.cartService.getCartPriceInfo();
      }
    });
  }

  openConfirmCartClearModal(): Observable<boolean> {
    this.checkCartClearModalRef = this.modalService.open(
      ConfirmCartClearModalComponent,
      { modalClass: 'modal-dialog-centered' }
    );
    return this.checkCartClearModalRef.onClose;
  }

  confirmOrderHandler(): void {
    if (this.cartPriceInfo.numOfStoreProducts === 0) {
      alert('There are no items in your cart.');
    }
    if (!this.currentUser.uid) {
      alert('Please log in.');
      this.locationService.navigateTo1_4();
      return;
    }
    this.openConfirmOrderModal().subscribe((selected) => {
      if (selected) {
        // Order confirmed
        // Register order information in the database
        const orderData: CartToOrder = {
          user_id: this.currentUser.uid,
          order_date: new Date(),
          order_products: this.userCart,
        };
        this.afs
          .collection<CartToOrder>('orders')
          .add(orderData)
          .then(() => {
            // console.log(doc)
            alert('💙Your item has been successfully purchased!');
            this.cartService.clearCart();
            this.cartService.clearCartCacheFromStorage();
            this.userCart = {} as StoreProductExt[];
            this.cartPriceInfo = this.cartService.getCartPriceInfo();
            this.locationService.navigateTo1_1();
          })
          .catch((err) => {
            console.log(err)
            alert('🥲Sorry, Something went wrong.');
          });
      }
    });
  }

  openConfirmOrderModal(): Observable<boolean> {
    this.confirmOrderModalRef = this.modalService.open(
      ConfirmOrderModalComponent,
      { modalClass: 'modal-dialog-centered' }
    );
    return this.confirmOrderModalRef.onClose;
  }

  hasCanNotOrderProducts(): boolean {
    if (
      this.storeMessage.store_available_flag === 0 || // business holiday
      this.cartPriceInfo.numOfStoreProducts === 0
    ) {
      return true;
    }
    return false;
  }

  handleBack(): void {
    this.location.back();
  }
}
