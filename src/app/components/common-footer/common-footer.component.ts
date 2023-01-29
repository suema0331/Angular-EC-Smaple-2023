import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.scss'],
})
export class CommonFooterComponent {
  envView = environment;

  navigateToShopHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/shop-info.html`, '_blank', 'noreferrer');
    window.open(
      `https://nuxt-web-app-testing.netlify.app/`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToPrivacyHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/policy.html`, '_blank', 'noreferrer');
    window.open(
      `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToComplianceHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/compliance.html`, '_blank', 'noreferrer');
    window.open(`https://haruno-suematsu.netlify.app/`, '_blank', 'noreferrer');
  }
}
