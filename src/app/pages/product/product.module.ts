import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { AppSharedModule } from 'src/app/app.shared.module';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [ProductRoutingModule, AppSharedModule],
  providers: [],
  bootstrap: [],
})
export class ProductModule {}
