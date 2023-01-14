import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthRestClient } from './services/auth.rest.client';
import { LogService } from './services/log.service';
import { RestClient } from './services/rest.client';
import { StorageService } from './services/storage.service';
import { UtilService } from './services/util.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthRestClient,
    AuthService,
    LogService,
    RestClient,
    StorageService,
    UtilService,
  ],
  bootstrap: []
})
export class SharedModule{}
