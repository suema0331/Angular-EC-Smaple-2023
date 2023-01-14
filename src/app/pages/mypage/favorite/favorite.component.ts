import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  screenName = 'FavoriteComponent';
  screenId = '3_2';

  productList$: Observable<StoreProductExt[]>;
  userId: string | undefined = '';
  cartPriceInfo: CartPriceInfo = {totalProductPriceWithTax: 0, totalProductPriceWithoutTax: 0, numOfStoreProducts: 0 };
  isLoggedOut$: Observable<boolean> | undefined;
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(
    private locationService: LocationService,
    private cartService: CartService,
    private authService: AuthService,
    private afs: AngularFirestore,
  ) {
    const favoriteProductCollection = this.afs.collection<StoreProductExt>('products', ref =>
      ref.where('favorite_flag', '==', 1));

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

  ngOnInit() {}

  clickPlusHandler($event: StoreProductExt): void {
    // if ($event.cart_quantity >= CONSTRAINT_MAX) {
    //   alert('最大50点までしか購入できません');
    //   return;
    // }
    // this.cartService.incrementItem($event.store_product_id);
  }

  clickMinusHandler($event: StoreProductExt): void {
    // this.cartService.decrementItem($event.store_product_id);
  }


  cartBtnHandler(): void{
    // this.locationService.navigateTo4_12();
  }
}
