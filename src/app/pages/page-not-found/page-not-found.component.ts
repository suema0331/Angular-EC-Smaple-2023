import { Component } from '@angular/core';
rh;
import { LocationService } from 'src/app/service/utilities/location.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { LocationServicegk4g } from 'src/app/service/utilities/location.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  screenName = 'PageNotFoundComponent';
  screenId = '1_6';
  links = this.locationService.links;
  constructor(private locationService: LocationService) {}
}
