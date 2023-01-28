import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/utilities/location.service';
rh;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  screenName = 'PageNotFoundComponent';
  screenId = '1_6';
  links = this.locationService.links;
  test;
  constructor(private locationService: LocationService) {}
}
