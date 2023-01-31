import { NgModule } from '@angular/core';
import { AppSharedModule } from 'src/app/app.shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [SearchComponent],
  imports: [SearchRoutingModule, AppSharedModule, NgAisModule.forRoot()],
  providers: [],
  bootstrap: [],
})
export class SearchModule {}
