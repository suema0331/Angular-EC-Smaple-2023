import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgAisModule } from 'angular-instantsearch';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbNotificationModule } from 'mdb-angular-ui-kit/notification';
import { MdbStepperModule } from 'mdb-angular-ui-kit/stepper';
import { SharedModule } from 'src/shared/shared.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { CartSummaryBtnComponent } from './components/cart-summary-btn/cart-summary-btn.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddCartToastComponent } from './components/toasts/add-cart-toast/add.cart.toast.component';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { FavoriteComponent } from './pages/mypage/favorite/favorite.component';
import { MypageComponent } from './pages/mypage/mypage/mypage.component';
import { PastitemComponent } from './pages/mypage/pastitem/pastitem.component';
import { CartComponent } from './pages/order/cart/cart.component';
import { ConfirmCartClearModalComponent } from './pages/order/confirm-cart-clear-modal/confirm-cart-clear-modal.component';
import { ConfirmOrderModalComponent } from './pages/order/confirm-order-modal/confirm-order-modal.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { SearchComponent } from './pages/search/search.component';
import { ShopGuideComponent } from './pages/shop-guide/shop-guide.component';
import { ShopTopComponent } from './pages/shop-top/shop-top.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ApplicationService } from './service/application.service';
import { CartService } from './service/domains/cart.service';
import { ImageUrlService } from './service/utilities/image.url.service';
import { LocationService } from './service/utilities/location.service';
import { NotificationService } from './service/utilities/notification.service';
import { PriceService } from './service/utilities/price.service';
import { SEOService } from './service/utilities/seo.service';
import { ValidationService } from './service/utilities/validation.service';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ShopTopComponent,
    MypageComponent,
    CartComponent,
    FavoriteComponent,
    PastitemComponent,
    PageNotFoundComponent,
    SearchComponent,
    LoginComponent,
    MaintenanceComponent,
    ShopGuideComponent,
    ProductDetailComponent,
    SignupComponent,
    ProductCardComponent,
    CommonHeaderComponent,
    CartSummaryBtnComponent,
    AddCartToastComponent,
    CartProductCardComponent,
    ConfirmCartClearModalComponent,
    ConfirmOrderModalComponent,
    CommonFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbFormsModule,
    MdbModalModule,
    MdbStepperModule,
    MdbNotificationModule,
    MdbCarouselModule,
    MdbRippleModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgAisModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    ApplicationService,
    LocationService,
    ValidationService,
    ImageUrlService,
    PriceService,
    CartService,
    NotificationService,
    SEOService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
