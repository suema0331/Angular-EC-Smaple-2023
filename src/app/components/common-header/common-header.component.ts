import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { LocationService } from 'src/app/service/utilities/location.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent {
  @Input() headerTitle = '';
  @Input() isBack = true;
  @Input() backUrl = '';

  constructor(
    private location: Location,
    public locationService: LocationService,
  ) { }

  handleBack(): void {
    this.backUrl ?  this.locationService.navigateTo(this.backUrl) : this.location.back();
  }
}
