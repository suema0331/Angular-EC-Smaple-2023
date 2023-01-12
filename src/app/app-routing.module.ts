import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { FavoriteComponent } from './pages/mypage/favorite/favorite.component';
import { MypageComponent } from './pages/mypage/mypage/mypage.component';
import { CartComponent } from './pages/order/cart/cart.component';
import { OrderHistoryComponent } from './pages/order/order-history/order-history.component';
import { ShopTopComponent } from './pages/shop-top/shop-top.component';
import { OrderHistoryDetailComponent } from './pages/order/order-history-detail/order-history-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CheckoutComponent } from './pages/order/checkout/checkout.component';
import { PastitemComponent } from './pages/mypage/pastitem/pastitem.component';
import { SearchComponent } from './pages/shop-top/search/search.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';

const BASE_TITLE = 'ｸｲｰﾝｽﾞ伊勢丹ﾈｽﾊﾟ';

const routes: Routes = [
  //  When path matches,create new instance of component
  // Category id parameter The component can read this later and show products for this category
  {
    path: 'shop-top',
    component: ShopTopComponent,
    data: {
      title: BASE_TITLE + ' - Top Page',
      description: 'This is a shop top page',
      ogUrl: 'http://localhost:4200/#/shop-top',
    },
  },
  {
    path: '',
    redirectTo: '/products', pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      title: BASE_TITLE + ' - Search Page',
      description: 'This is a search page',
      ogUrl: 'http://localhost:4200/#/search',
    },
  },
  {
    path: 'products',
    component: ProductListComponent,
    data: {
      title: BASE_TITLE + ' - Product List Page',
      description: 'This is a product list page',
      ogUrl: 'http://localhost:4200/#/products',
    }
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent,
    data: {
      title: BASE_TITLE + ' - Product Detail Page',
      description: 'This is a product Detail page',
      ogUrl: 'http://localhost:4200/#/products/:productId',
    }
  },
  {
    path: 'mypage',
    component: MypageComponent,
    data: {
      title: BASE_TITLE + ' - My Page',
      description: 'This is a my page',
      ogUrl: 'http://localhost:4200/#/mypage',
    }
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    data: {
      title: BASE_TITLE + ' - Favorite Page',
      description: 'This is a favorite page',
      ogUrl: 'http://localhost:4200/#/favorite',
    }
  },
  {
    path: 'pastitem',
    component: PastitemComponent,
    data: {
      title: BASE_TITLE + ' - Past Item Page',
      description: 'This is a past item page',
      ogUrl: 'http://localhost:4200/#/pastitem',
    }
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
  },
  {
    path: 'order-history/:orderId',
    component: OrderHistoryDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: BASE_TITLE + ' - Page Not Found',
      description: 'page not found',
    }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
