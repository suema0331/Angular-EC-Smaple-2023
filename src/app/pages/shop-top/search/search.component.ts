import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';
import { LocationService } from 'src/app/service/utilities/location.service';

const searchClient = algoliasearch(
  'CF1WVZ4JQG',
  '488ec6355da8fef55477fc85d464a645'
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  screenName = 'SearchComponent';
  screenId = '1_2';

  constructor(
    private locationService: LocationService,
  ) {}
  // config for algoliasearch
  config = {
    indexName: 'angular-ec-2023',
    searchClient
  };

  backToTopHandler(): void{
    this.locationService.navigateTo1_1();
  }
}
