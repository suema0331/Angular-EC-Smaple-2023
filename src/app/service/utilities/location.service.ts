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

  // navigate to the url inside the application
  navigateTo(url: string): void {
    // Always check maintenance mode status before navigation
    console.log(url)
    this.navigateToMaintenanceIfMaintenanceMode(url)
  }

    // クエリパラメータを取得
  getQueryParam(name: string): string | null {
    const url = location.href;
    let value = null;
    if (url.includes('?')){
      const httpParams = new HttpParams({ fromString: url.split('?')[1]});
      value = httpParams.get(name);
    }
    return value;
  }

  navigateToMaintenanceIfMaintenanceMode(url: string): void {
    this.systemStatus$.subscribe(res => {
      console.log(res[0])
      if (res[0] && res[0].user_app_run_status === 0) {
        this.logService.logDebug('navigation to the /maintenance !')
        this.router.navigateByUrl('/maintenance');
      } else {
        this.logService.logDebug(`navigation to the ${url} !`);
        this.router.navigateByUrl(url);
      }
    })
  }

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
  // If we have a backend server, I will send a request to the backend
  // navigateToMaintenanceIfMaintenanceMode(url: string): void{
  //   this.systemStatusRestUserServiceExt.getSystemStatus()
  //     .subscribe((res) => {
  //       // maintenance mode
  //       if (res.user_app_run_status === 0) {
  //         this.logService.logDebug('navigation to the /maintenance !')
  //         this.router.navigateByUrl('/maintenance');
  //       } else {
  //         // TODO Imprement GUARD
  //         this.logService.logDebug(`navigation to the ${url} !`);
  //         this.router.navigateByUrl(url);
  //       }
  //     })
  // }



  // Assuming screen IDs are managed centrally(in requirement definition documents, etc.),
  // navigations are also managed in one place based on screen IDs, so that the same method is not written many pages.

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
