import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LogService } from './services/log.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [AuthService, LogService, StorageService],
  bootstrap: [],
})
export class SharedModule {}
