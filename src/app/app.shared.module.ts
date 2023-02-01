import { NgModule } from '@angular/core';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { CartSummaryBtnComponent } from './components/cart-summary-btn/cart-summary-btn.component';
import { CommonFooterComponent } from './components/common-footer/common-footer.component';
import { CommonHeaderComponent } from './components/common-header/common-header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AddCartToastComponent } from './components/toasts/add-cart-toast/add-cart-toast.component';
import { MypageComponent } from './pages/mypage/mypage/mypage.component';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductCardComponent,
    CommonHeaderComponent,
    CartSummaryBtnComponent,
    AddCartToastComponent,
    CartProductCardComponent,
    CommonFooterComponent,
    MypageComponent,
  ],
  imports: [RouterModule, SharedModule, CommonModule],
  exports: [
    ProductCardComponent,
    CommonHeaderComponent,
    CartSummaryBtnComponent,
    AddCartToastComponent,
    CartProductCardComponent,
    CommonFooterComponent,
    MypageComponent,
    SharedModule,
    CommonModule,
  ],
})
export class AppSharedModule {}
