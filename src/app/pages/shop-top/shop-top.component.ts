import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable, map } from 'rxjs';
import { ApplicationService } from 'src/app/service/application.service';
import { CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { environment } from 'src/environments/environment';
import { LogService } from 'src/shared/services/log.service';
import { ShopGuideComponent } from '../shop-guide/shop-guide.component';

@Component({
  selector: 'app-shop-top',
  templateUrl: './shop-top.component.html',
  styleUrls: ['./shop-top.component.scss']
})
export class ShopTopComponent {
  screenName = 'ShopTopComponent';
  screenId = '1_1';

  onboardModalRef: MdbModalRef<ShopGuideComponent> | undefined;
  // signupDialogRef: MdbModalRef<SignupDialogPageComponent> | undefined;

  isScroll = false;
  isScrollDown = false;
  currentPageYOffset = 0;

  // topPageInfo: UserTopPageInfo = {
  //   categories: []
  // };
  private productCollection: AngularFirestoreCollection<StoreProductExt>;
  recommendedProductList$: Observable<StoreProductExt[]>;
  // cartPriceInfo: CartPriceInfo = {totalProductPriceWithTax: 0, totalProductPriceWithoutTax: 0, numOfStoreProducts: 0 };
  constructor(
    private locationService: LocationService,
    // private logService: LogService,
    private modalService: MdbModalService,
    private cartService: CartService,
    private afs: AngularFirestore
  ) {
    // Get up to 6 products in order of registration
    this.productCollection = afs.collection<StoreProductExt>('products', (ref) => ref.limit(6));
    this.recommendedProductList$ = this.productCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as StoreProductExt;
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      )
    );
    // console.log(this.recommendedProductList$)
  }
  clickPlusHandler($event: StoreProductExt): void {
    this.cartService.incrementItem($event.store_product_id);
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
    // this.locationService.navigateTo4_12();
  }

  openModal(): void {
    this.onboardModalRef = this.modalService.open(ShopGuideComponent,
      {
        modalClass: 'modal-dialog-centered'
      }
    );
  }

  // openSignUpDialog(): void{
  //   this.signupDialogRef = this.modalService.open(SignupDialogPageComponent,
  //     {
  //       modalClass: 'modal-dialog-centered'
  //     }
  //   );
  // }


  loginHandler(): void{
    this.locationService.navigateTo('/login?return=/shop-top');
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
