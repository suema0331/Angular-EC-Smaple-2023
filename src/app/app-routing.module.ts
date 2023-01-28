import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/services/auth.guard';
import { VIPGuard } from 'src/shared/services/vip.guard';
import { LoginComponent } from './pages/login/login.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { FavoriteComponent } from './pages/mypage/favorite/favorite.component';
import { PastitemComponent } from './pages/mypage/pastitem/pastitem.component';
import { CartComponent } from './pages/order/cart/cart.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchComponent } from './pages/search/search.component';
import { ShopTopComponent } from './pages/shop-top/shop-top.component';
import { SignupComponent } from './pages/signup/signup.component';

const BASE_TITLE = 'Angular EC App';

const routes: Routes = [
  //  When path matches,create new instance of component
  {
    path: '',
    redirectTo: '/shop-top',
    pathMatch: 'full',
  },
  {
    path: 'shop-top',
    component: ShopTopComponent,
    data: {
      title: BASE_TITLE + ' - Top Page',
      description: 'This is a shop top page.',
      ogUrl: 'http://localhost:4200/shop-top',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: BASE_TITLE + ' - Login Page',
      description: 'This is a login page.',
      ogUrl: 'http://localhost:4200/login',
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: BASE_TITLE + ' - Signup Page',
      description: 'This is a signup page.',
      ogUrl: 'http://localhost:4200/signup',
    },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      title: BASE_TITLE + ' - Search Page',
      description: 'This is a search page.',
      ogUrl: 'http://localhost:4200/search',
    },
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    canActivate: [AuthGuard],
    data: {
      title: BASE_TITLE + ' - Favorite Page',
      description: 'This is a favorite page.',
      ogUrl: 'http://localhost:4200/favorite',
    },
  },
  {
    path: 'pastitem',
    component: PastitemComponent,
    canActivate: [VIPGuard],
    data: {
      title: BASE_TITLE + ' - Past Item Page',
      description: 'This is a past item page',
      ogUrl: 'http://localhost:4200/pastitem',
    },
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: BASE_TITLE + ' - Page Not Found',
      description: 'Page not found',
    },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
