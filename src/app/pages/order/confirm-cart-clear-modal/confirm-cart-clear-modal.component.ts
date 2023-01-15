import {Component} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';
import {StoreProductExt} from '../../../../backend/dto/common/store_product_ext';

@Component({
  selector: 'confirm-cart-clear-modal',
  templateUrl: './confirm-cart-clear-modal.component.html',
  styleUrls: ['./confirm-cart-clear-modal.component.scss']
  })
export class ConfirmCartClearModalComponent {
  screenName = 'ConfirmCartClearModalComponent';
  storeProductExt = {} as StoreProductExt;

  constructor(
    public modalRef: MdbModalRef<ConfirmCartClearModalComponent>,
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
