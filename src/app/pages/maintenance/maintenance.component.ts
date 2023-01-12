import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/utilities/location.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent {
  screenName = 'MaintenanceComponent';
  screenId = '1_3';

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {
    // monitor the state of Maintenance　mode
    this.locationService.navigateToMaintenanceIfMaintenanceMode('/shop-top');
  }

}
