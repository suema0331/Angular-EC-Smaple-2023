import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent{
  screenName = 'FavoriteComponent';
  screenId = '3_2';

  productList$: Observable<StoreProductExt[]>;
  userId: string | undefined = '';
  cartPriceInfo: CartPriceInfo =  this.cartService.getCartPriceInfo();
  isLoggedIn = this.authService.isLoggedIn;

  constructor(
    private cartService: CartService,
    private afs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
    const favoriteProductCollection = this.afs.collection<StoreProductExt>('products', ref =>
      ref
        .where('favorite_flag', '==', 1)
        // Sort sold-out items so that they come last.
        .orderBy('product_status', 'asc'));
    // If another field is used in the operation and orderby used in the where condition, a composite index is required.
    // https://cloud.google.com/firestore/docs/query-data/indexing

    this.productList$ = favoriteProductCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as StoreProductExt;
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      )
    );
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


  cartBtnHandler(): void{
    // this.locationService.navigateTo4_12();
  }
}
