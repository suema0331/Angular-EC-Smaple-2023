import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const BASE_TITLE = 'Angular EC App';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      title: BASE_TITLE + ' - Product List Page',
      description: 'This is a product list page.',
      ogUrl: 'http://localhost:4200/products',
    },
  },
  {
    path: ':productId',
    component: ProductDetailComponent,
    data: {
      title: BASE_TITLE + ' - Product Detail Page',
      description: 'This is a product Detail page.',
      ogUrl: 'http://localhost:4200/products/:productId',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
