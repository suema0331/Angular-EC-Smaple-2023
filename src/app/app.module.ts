import { NgModule, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgAisModule } from 'angular-instantsearch';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbNotificationModule } from 'mdb-angular-ui-kit/notification';
import { MdbStepperModule } from 'mdb-angular-ui-kit/stepper';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.shared.module';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { FavoriteComponent } from './pages/mypage/favorite/favorite.component';
import { PastitemComponent } from './pages/mypage/pastitem/pastitem.component';
import { CartComponent } from './pages/order/cart/cart.component';
import { ConfirmCartClearModalComponent } from './pages/order/confirm-cart-clear-modal/confirm-cart-clear-modal.component';
import { ConfirmOrderModalComponent } from './pages/order/confirm-order-modal/confirm-order-modal.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { ShopGuideComponent } from './pages/shop-guide/shop-guide.component';
import { ShopTopComponent } from './pages/shop-top/shop-top.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopTopComponent,
    CartComponent,
    FavoriteComponent,
    PastitemComponent,
    PageNotFoundComponent,
    SearchComponent,
    LoginComponent,
    MaintenanceComponent,
    ShopGuideComponent,
    SignupComponent,
    ConfirmCartClearModalComponent,
    ConfirmOrderModalComponent,
  ],
  imports: [
    AppSharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdbFormsModule,
    MdbModalModule,
    MdbStepperModule,
    MdbNotificationModule,
    MdbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgAisModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      // To avoid delay in building the initial view of the application, the registration of service workers is delayed by 30 seconds.
      // Now 5 seconds just for the demo.
      registrationStrategy: 'registerWhenStable:5000',
    }),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
