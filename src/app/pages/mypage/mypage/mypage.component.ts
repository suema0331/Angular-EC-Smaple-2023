import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/utilities/location.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth.service';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent {
  screenName = 'MypageComponent';
  screenId = '3_1';

  user$ = this.authService.user

  constructor(
    public locationService: LocationService,
    private authService: AuthService,
  ) {
    // user = this.authService.user.subscribe()
    this.user$.subscribe(res => {
      console.log("🌟subscribed User data")
      console.log(res)
    })
  }

  logoutHandler(): void{

    this.authService.logout();
    alert('Successfully logged out!');
    this.locationService.navigateTo1_1();
  }

  handleBack(): void {
    this.locationService.navigateBack('/mypage');
  }

  loginHandler(): void{
    this.locationService.navigateTo1_4();
  }

  navigateToFavoriteHandler(): void{
    this.locationService.navigateTo3_2();
  }

  navigateToPastitemHandler(): void{
    this.locationService.navigateTo3_3();
  }

  navigateToCampaignHandler(): void{
      if (environment.production) {
      // If we have production server
      // window.open(`${environment.BASE_URL}/campaign.html`, '_blank');
      window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    } else {
       window.open(`https://nuxt-web-app-testing.netlify.app/`, '_blank');
    }
  }

  navigateToFaqHandler(): void{
    if (environment.production){
      window.open(`https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`, '_blank');
    } else {
      window.open(`https://github.com/suema0331/My-Typescript-Express-Mocha-with-Swagger`, '_blank');
    }
  }

  navigateToTermsHandler(): void{
    if (environment.production){
      window.open(`https://www.linkedin.com/in/haruno-suematsu-b20a03235/`, '_blank');
    } else {
      window.open(`https://www.linkedin.com/in/haruno-suematsu-b20a03235/`, '_blank');
    }
  }

  navigateToPolicyHandler(): void{
    if (environment.production){
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    } else {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    }
  }
}
