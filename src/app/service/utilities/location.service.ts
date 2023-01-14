import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';
import { SystemStatusRestUserServiceExt } from '../../../backend/services/system.status.rest.user.service.ext';
import { LogService } from '../../../shared/services/log.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class LocationService{

  private systemStatusCollection: AngularFirestoreCollection<SystemStatusResponse>
  systemStatus$: Observable<SystemStatusResponse[]>

  constructor(
    private logService: LogService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.systemStatusCollection = afs.collection<SystemStatusResponse>('system-status', (ref) => ref.limit(1));
    this.systemStatus$ = this.systemStatusCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as SystemStatusResponse;
          const id = a.payload.doc.id;

          return { id, ...data };
        })
      )
    );
  }

  // Navigate to the url inside the application
  navigateTo(url: string): void {
    // Always check maintenance mode status before navigation
    this.navigateToMaintenanceIfMaintenanceMode(url)
  }

  // Get query parameters
  getQueryParam(name: string): string | null {
    const url = location.href;
    let value = null;
    if (url.includes('?')){
      const httpParams = new HttpParams({ fromString: url.split('?')[1]});
      value = httpParams.get(name);
    }
    return value;
  }

  // Checks if the system is in system maintenance mode during all transitions
  navigateToMaintenanceIfMaintenanceMode(url: string): void {
    this.systemStatus$.subscribe(res => {
      if (res[0] && res[0].user_app_run_status === 0) {
        this.logService.logDebug('navigation to the /maintenance !')
        this.router.navigateByUrl('/maintenance');
      } else {
        this.logService.logDebug(`navigation to the ${url} !`);
        this.router.navigateByUrl(url);
      }
    })
  }

  // Defines which page the back button returns to and to which page
  navigateBack(url: string): void{
    if (url.startsWith('/mypage')){
      // TOPに遷移
      this.navigateTo1_1();
      return;
    }
    // if (url.startsWith('/step/purchase')){
    //   // カートに遷移
    //   this.navigateTo4_12();
    //   return;
    // }
    // if (url.startsWith('/step/confirm')){
    //   // 注文に遷移
    //   this.navigateTo5_2();
    //   return;
    // }
  }

  /**
   * If we have a backend server, I will send a request to the backend like below
   */
  // navigateToMaintenanceIfMaintenanceMode(url: string): void {
  //   const storeStatus = this.systemStatusRestUserServiceExt.getSystemStatus();
  //   storeStatus.subscribe((value) => {
  //     if (value.user_app_run_status === 0) {
  //       this.router.navigateByUrl('/maintenance');
  //     } else {
  //       // Members-only pages that require a login or sign-up dialog
  //       if (this.isMembersOnlyPage(url) && this.authService.isLoggedOut()){
  //         this.modalService.open(SignupDialogPageComponent, {
  //           data: { returnURL: url},
  //           modalClass: 'modal-dialog-centered'
  //         });
  //       } else {
  //         this.router.navigateByUrl(url);
  //       }
  //     }
  //   });
  // }
  // isMembersOnlyPage(url: string): boolean {
  //   return url.startsWith('/favorite') ||
  //     url.startsWith('/pastitem') ||
  //     url.startsWith('/mypage/order-history') ||
  //     url.startsWith('/cart');
  // }



  /**
   * Assuming screen IDs are managed centrally(in requirement definition documents, etc.),
   *  Navigations and page paths are also managed in one place based on screen IDs in this LocationService, so that
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
}
