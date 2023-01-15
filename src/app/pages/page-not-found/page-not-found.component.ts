import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/utilities/location.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(
    public locationService: LocationService,
  ){}

}
