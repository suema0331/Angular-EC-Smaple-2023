import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/domains/auth.service';

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
    // If we have production server
    // window.open(`${environment.BASE_URL}/campaign.html`, '_blank', 'noreferrer');
    window.open(
      `https://nuxt-web-app-testing.netlify.app/`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToFaqHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/faq.html`, '_blank', 'noreferrer');
    window.open(
      `https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToTermsHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/terms.html`, '_blank', 'noreferrer');
    window.open(
      `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToPolicyHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/policy.html`, '_blank', 'noreferrer');
    window.open(`https://haruno-suematsu.netlify.app/`, '_blank', 'noreferrer');
  }
}
