import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';
import { LogService } from '../../../shared/services/log.service';
@Injectable()
export class LocationService {
  private systemStatusCollection: AngularFirestoreCollection<SystemStatusResponse>;
  systemStatusSubscription: Subscription;
  isMentenance = false;

  constructor(
    private logService: LogService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.systemStatusCollection = this.afs.collection<SystemStatusResponse>(
      'system-status',
      (ref) => ref.limit(1)
    );
    this.systemStatusSubscription = this.systemStatusCollection
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as SystemStatusResponse;
            const id = a.payload.doc.id;

            return { id, ...data };
          })
        )
      )
      .subscribe((data) => {
        /**
         *  monitor the state of system maintenance mode
         */
        if (data[0] && data[0].user_app_run_status === 0) {
          this.isMentenance = true;
          this.logService.logDebug('navigation to the /maintenance !');
          this.router.navigateByUrl('/maintenance');
        } else {
          if (this.isMentenance) {
            this.router.navigateByUrl('/');
            this.isMentenance = false;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.systemStatusSubscription.unsubscribe();
  }

  // Navigate to the url inside the application
  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  // Get query parameters
  getQueryParam(name: string): string | null {
    const url = location.href;
    let value = null;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      value = httpParams.get(name);
    }
    return value;
  }

  /**
   * Assuming screen IDs are managed centrally(in requirement definition documents, etc.),
   * Navigations and page paths are also managed in one place based on screen IDs in this LocationService, so that
   * to be resistant to page path changes, eliminating the need to re-implement all pages when the path is changed
   */
  // navigate to ShopTopComponent
  navigateTo1_1(): void {
    this.navigateTo(`/shop-top`);
  }

  // navigate to ShopTopComponent
  navigateTo1_2(): void {
    this.navigateTo(`/search`);
  }

  // navigate to MaintenenceComponent
  navigateTo1_3(): void {
    this.navigateTo(`/maintenence`);
  }

  // navigate to MaintenenceComponent
  navigateTo1_4(): void {
    this.navigateTo(`/login`);
  }

  // navigate to MaintenenceComponent
  navigateTo1_5(): void {
    this.navigateTo(`/signup`);
  }
  // navigate to ProductListComponent
  navigateTo2_1(): void {
    this.navigateTo(`/products`);
  }

  // navigate to ProductDetailComponent
  navigateTo2_2(): void {
    this.navigateTo(`/product`);
  }

  // navigate to MypageComponent
  navigateTo3_1(): void {
    this.navigateTo(`/mypage`);
  }

  // nvigate to FavoriteComponent
  navigateTo3_2(): void {
    this.navigateTo(`/favorite`);
  }

  // nvigate to FavoriteComponent
  navigateTo3_3(): void {
    this.navigateTo(`/pastitem`);
  }

  // nvigate to CartComponent
  navigateTo4_1(): void {
    this.navigateTo(`/cart`);
  }
}
