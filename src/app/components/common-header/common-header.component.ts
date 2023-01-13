import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent {
  @Input() headerTitle = '';
  @Input() isBack = true;
  @Input() isSkip = false;
  @Input() skipRoutePath = '/';

  constructor(private location: Location) { }

  handleBack(): void {
    this.location.back();
  }
}
