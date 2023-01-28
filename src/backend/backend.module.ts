import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { SystemStatusRestUserServiceExt } from './services/system.status.rest.user.service.ext';
@NgModule({
  declarations: [],
  imports: [HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [],
})
export class BackendModule {}
