import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LogService } from './services/log.service';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    LogService,
    StorageService,
  ],
  bootstrap: []
})
export class SharedModule{}
