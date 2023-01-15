import {Component} from '@angular/core';

@Component({
  selector: 'add-cart-image-toast',
  templateUrl: './add.cart.toast.component.html',
  styleUrls: ['./add.cart.toast.component.scss']
})
export class AddCartToastComponent {
  screenName = 'AddCartToast';

  // Overridden when the Toast is generated
  productImage = '';
  produceArea = '';
  productName = '';
  productBrand = '';

  // Overridden when the Toast is generated
  closeHandler(): void {}

  constructor(){}

  close(): void {
    // Calls the toast close process passed from NotificationService.
    this.closeHandler();
  }
}
