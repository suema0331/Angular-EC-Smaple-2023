import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
})
export class MypageComponent {
  screenName = 'MypageComponent';
  screenId = '3_1';

  currentUser = this.authService.currentUser;
  links = this.locationService.links;
  envView = environment;

  @Output() closeMenuHandler: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public locationService: LocationService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  logoutHandler(): void {
    this.authService
      .logout()
      .then(() => {
        alert('Successfully logged out!');
        console.log('Successfully logged out!');
        this.cartService.clearCart();
        this.cartService.clearCartCacheFromStorage();
        this.clickCloseMenu();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickCloseMenu() {
    this.closeMenuHandler.emit(true);
  }

  navigateToCampaignHandler($event: Event): void {
    $event.preventDefault();
    if (environment.production) {
      // If we have production server
      // window.open(`${environment.BASE_URL}/campaign.html`, '_blank');
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    } else {
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    }
  }

  navigateToFaqHandler($event: Event): void {
    $event.preventDefault();
    if (environment.production) {
      window.open(
        `https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`,
        '_blank'
      );
    } else {
      window.open(
        `https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`,
        '_blank'
      );
    }
  }

  navigateToTermsHandler($event: Event): void {
    $event.preventDefault();
    if (environment.production) {
      window.open(
        `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
        '_blank'
      );
    } else {
      window.open(
        `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
        '_blank'
      );
    }
  }

  navigateToPolicyHandler($event: Event): void {
    $event.preventDefault();
    if (environment.production) {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    } else {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    }
  }
}
