import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { StoreProductExt } from '../../../../backend/dto/common/store_product_ext';

@Component({
  selector: 'confirm-order-modal',
  templateUrl: './confirm-order-modal.component.html',
  styleUrls: ['./confirm-order-modal.component.scss']
  })
export class ConfirmOrderModalComponent {
  screenName = 'ConfirmOrderModalComponent';
  storeProductExt = {} as StoreProductExt;

  constructor(
    public modalRef: MdbModalRef<ConfirmOrderModalComponent>,
  ){}

  clickYesHandler(): void{
    this.storeProductExt.cart_quantity = 0;
    this.modalRef.close(true);
  }

  clickNoHandler(): void{
    this.storeProductExt.cart_quantity = 1;
    this.modalRef.close(false);
  }

}
