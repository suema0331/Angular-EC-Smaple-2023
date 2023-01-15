import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgAisModule } from 'angular-instantsearch';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { SharedModule } from 'src/shared/shared.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { FavoriteComponent } from './pages/mypage/favorite/favorite.component';
import { MypageComponent } from './pages/mypage/mypage/mypage.component';
import { PastitemComponent } from './pages/mypage/pastitem/pastitem.component';
import { CartComponent } from './pages/order/cart/cart.component';
import { CheckoutComponent } from './pages/order/checkout/checkout.component';
import { OrderHistoryDetailComponent } from './pages/order/order-history-detail/order-history-detail.component';
import { OrderHistoryComponent } from './pages/order/order-history/order-history.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ShopGuideComponent } from './pages/shop-guide/shop-guide.component';
import { SearchComponent } from './pages/shop-top/search/search.component';
import { ShopTopComponent } from './pages/shop-top/shop-top.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ApplicationService } from './service/application.service';
import { ImageUrlService } from './service/utilities/image.url.service';
import { LocationService } from './service/utilities/location.service';
import { PriceService } from './service/utilities/price-service.service';
import { SEOService } from './service/utilities/seo.service';
import { ValidationService } from './service/utilities/validation.service';
import { CartSummaryBtnComponent } from './components/cart-summary-btn/cart-summary-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ShopTopComponent,
    MypageComponent,
    CartComponent,
    CheckoutComponent,
    FavoriteComponent,
    PastitemComponent,
    OrderHistoryComponent,
    OrderHistoryDetailComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
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
    // CartService,
    SEOService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
