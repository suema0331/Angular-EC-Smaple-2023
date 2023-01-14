import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  screenName = 'ProductListComponent';
  screenId = '2_1';

  isScroll = false;
  isScrollDown = false;
  prevPageYOffset = 0;

  isLoggedOut$: Observable<boolean> | undefined;
  isLoggedIn$: Observable<boolean> | undefined;

  private productCollection: AngularFirestoreCollection<StoreProductExt>;
  productList$: Observable<StoreProductExt[]>;

  constructor(
    public locationService: LocationService,
    private cartService: CartService,
    private afs: AngularFirestore,
  ) {
    this.productCollection = this.afs.collection<StoreProductExt>('products');
    this.productList$ = this.productCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as StoreProductExt;
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      )
    );
  }

  backToTopHandler(): void{
    this.locationService.navigateTo1_1();
  }

  navigateToSearchHandler(): void{
    this.locationService.navigateTo1_2();
  }

  navigateToMypageHandler(): void{
    this.locationService.navigateTo3_1();
  }

  clickPlusHandler($event: StoreProductExt): void {
    if ($event.cart_quantity >= CONSTRAINT_MAX) {
      return;
    }
    this.cartService.incrementItem($event.store_product_id);
  }

  clickMinusHandler($event: StoreProductExt): void {
    this.cartService.decrementItem($event.store_product_id);
  }

}
