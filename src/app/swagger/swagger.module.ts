import { NgModule } from '@angular/core';
import { SwaggerRoutingModule } from './swagger-routing.module';
import { AppSharedModule } from 'src/app/app.shared.module';
import { SwaggerComponent } from './swagger.component';

@NgModule({
  declarations: [SwaggerComponent],
  imports: [SwaggerRoutingModule, AppSharedModule],
  providers: [],
  bootstrap: [],
})
export class SwaggerModule {}
