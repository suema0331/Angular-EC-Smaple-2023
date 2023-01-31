import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';

const BASE_TITLE = 'Angular EC App';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data: {
      title: BASE_TITLE + ' - Search Page',
      description: 'This is a search page.',
      ogUrl: 'http://localhost:4200/search',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
