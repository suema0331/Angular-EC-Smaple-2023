import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, map } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import {
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { CartToOrder } from 'src/backend/dto/common/cart_to_order';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-pastitem',
  templateUrl: './pastitem.component.html',
  styleUrls: ['./pastitem.component.scss'],
})
export class PastitemComponent {
  screenName = 'PastitemComponent';
  screenId = '3_3';
  productList: Array<StoreProductExt> = [];
  orderSubscription: Subscription;

  currentUser = this.authService.currentUser;
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private locationService: LocationService,
    private afs: AngularFirestore
  ) {
    // Get Purchased products
    this.orderSubscription = this.afs
      .collection<CartToOrder>('orders', (ref) =>
        ref.where('user_id', '==', this.currentUser.uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as CartToOrder;
            const id = a.payload.doc.id;
            return { docmentId: id, ...data };
          })
        )
      )
      .subscribe((data) => {
        // console.log("🌟subscribed Orders data")
        // console.log(data)
        const productIds = new Map<string, number>();

        data.forEach((order) => {
          order.order_products.forEach((p) => {
            if (productIds.get(p.store_product_id)) {
              productIds.set(
                p.store_product_id,
                productIds.get(p.store_product_id)! + 1
              );
            } else {
              productIds.set(p.store_product_id, 1);
              this.productList.push(p);
            }
          });
        });
      });
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

  cartBtnHandler(): void {
    this.locationService.navigateTo4_1();
  }
}
