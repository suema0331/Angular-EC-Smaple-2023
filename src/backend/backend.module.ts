import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartRestUserServiceExt } from './services/cart.rest.user.service.ext';
import { OrderRestUserServiceExt } from './services/order.rest.user.service.ext';
import { SystemStatusRestUserServiceExt } from './services/system.status.rest.user.service.ext';
import { UserFavoriteRestUserService } from './services/user.favorite.rest.user.service';
import { UserQueryRestUserServiceExt } from './services/user.query.rest.user.service.ext';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    SharedModule
  ],
  providers: [
    // AuthRestService,
    CartRestUserServiceExt,
    OrderRestUserServiceExt,
    SystemStatusRestUserServiceExt,
    UserFavoriteRestUserService,
    UserQueryRestUserServiceExt,
  ],
  bootstrap: []
})
export class BackendModule{}
