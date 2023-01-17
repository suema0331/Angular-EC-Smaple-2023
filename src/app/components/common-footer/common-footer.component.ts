import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-common-footer',
  templateUrl: './common-footer.component.html',
  styleUrls: ['./common-footer.component.scss'],
})
export class CommonFooterComponent {
  navigateToShopHandler(): void {
    if (environment.production) {
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    } else {
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    }
  }

  navigateToPrivacyHandler(): void {
    if (environment.production) {
      window.open(
        `https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`,
        '_blank'
      );
    } else {
      window.open(
        `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
        '_blank'
      );
    }
  }

  navigateToComplianceHandler(): void {
    if (environment.production) {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    } else {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    }
  }
}
