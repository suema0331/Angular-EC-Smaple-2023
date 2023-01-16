import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map, mergeMap } from 'rxjs';
import { SEOService } from './service/utilities/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sample-angular-app-2023';
  screenName = 'AppComponent';
  screenId = '0';

  routerEventSubscription?: Subscription;

  constructor(
    private router: Router,
    private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd), // NavigationEnd - event fired when a screen transition is successfully completed
      map(() => this.activatedRoute),
      map((route) => {
        // iterate while until firstChild: null
        while (route.firstChild) { route = route.firstChild; } // firstChild - the first ActivatedRoute in this route's child routes
        console.log(`route.firstChild ${route}`); // Route(url:'products/1', path:'products/:productId')
        return route;
      }),
      filter((route) => route.outlet === 'primary'), // Unnamed outlets will be named primary
      mergeMap((route) => {
        return route.data
      })
    )
      .subscribe((event: any) => {
        this.seoService.updateTitle(event.title);
        // Updating Description tag dynamically with title
        // this.seoService.updateDescription(event.title + event.description);
        this.seoService.updateDescription(event.description);
        event.ogUrl ? this.seoService.updateOgUrl(event.ogUrl) : this.seoService.updateOgUrl('');
      });
  }

  ngOnDestroy(): void {
    this.routerEventSubscription?.unsubscribe();
  }
}
