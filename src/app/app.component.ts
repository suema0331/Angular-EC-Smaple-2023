import { Platform } from '@angular/cdk/platform';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map, mergeMap } from 'rxjs';
import { StorageService } from 'src/shared/services/storage.service';
import { STORAGE_KEY_CLOSED_PWA_DL_MODAL } from './extra/constants';
import { MetaInfo, SEOService } from './service/utilities/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sample-angular-app-2023';
  screenName = 'AppComponent';
  screenId = '0';

  routerEventSubscription?: Subscription;

  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(
    private router: Router,
    private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd), // NavigationEnd - event fired when a screen transition is successfully completed
        map(() => this.activatedRoute),
        map((route) => {
          // iterate while until firstChild: null
          while (route.firstChild) {
            route = route.firstChild;
          } // firstChild - the first ActivatedRoute in this route's child routes
          // console.log(`route.firstChild ${route}`); // Route(url:'products/1', path:'products/:productId')
          return route;
        }),
        filter((route) => route.outlet === 'primary'), // Unnamed outlets will be named primary
        mergeMap((route) => {
          return route.data;
        })
      )
      .subscribe((event: Partial<MetaInfo>) => {
        this.seoService.updateTitle(String(event.title));
        // Updating Description tag dynamically with title
        // this.seoService.updateDescription(event.title + event.description);
        this.seoService.updateDescription(String(event.description));
        event.ogUrl
          ? this.seoService.updateOgUrl(String(event.ogUrl))
          : this.seoService.updateOgUrl('');
      });
    const hasShowOnboard = this.storageService.get(
      STORAGE_KEY_CLOSED_PWA_DL_MODAL
    );
    console.log(hasShowOnboard);
    if (!hasShowOnboard || hasShowOnboard === 'false') {
      this.loadModalPwa();
    }
  }

  ngOnDestroy(): void {
    this.routerEventSubscription?.unsubscribe();
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt($event: any) {
    console.log($event);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    $event.preventDefault();
    // Stash the event so it can be triggered later.
    this.modalPwaEvent = $event;
    console.log("🔥beforeinstallprompt' event was fired.");
  }

  private loadModalPwa(): void {
    console.log(this.platform);
    const isInStandaloneMode =
      'standalone' in window.navigator && (<any>window.navigator)['standalone']; // true: working on PWA
    console.log(isInStandaloneMode);
    if (this.platform.ANDROID) {
      this.modalPwaPlatform = 'ANDROID';
    }

    // if (this.platform.IOS && this.platform.SAFARI) {
    if (this.platform.IOS) {
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    console.log(this.modalPwaEvent);
    try {
      this.modalPwaEvent.prompt();
      // Wait for the user to respond to the prompt
      // this.modalPwaEvent.userChoice.then((res: any) => {
      //   if (res.outcome === 'accepted') {
      //     console.log('User accepted the A2HS prompt');
      //   } else {
      //     console.log('User dismissed the A2HS prompt');
      //   }
      //   this.modalPwaEvent = null;
      // });
    } catch (error: any) {
      console.log('error.message');
      console.log(error.message);
      alert(
        `🥲Sorry, something happened. Sorry, something seems to have happened. You may have already added it, or you can manually press the "Add to Home Screen" button in the menu.`
      );
      this.storageService.set(STORAGE_KEY_CLOSED_PWA_DL_MODAL, 'true');
    }
    this.modalPwaEvent = null;
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
    this.storageService.set(STORAGE_KEY_CLOSED_PWA_DL_MODAL, 'true');
  }
}
