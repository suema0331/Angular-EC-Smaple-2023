import { Injectable } from '@angular/core';
import {
  MdbNotificationRef,
  MdbNotificationService,
} from 'mdb-angular-ui-kit/notification';
import { AddCartToastComponent } from 'src/app/components/toasts/add-cart-toast/add.cart.toast.component';
import { LogService } from '../../../shared/services/log.service';

@Injectable()
export class NotificationService {
  cartNotificationRef: MdbNotificationRef<AddCartToastComponent> | null = null;
  cartImageNotificationRef: MdbNotificationRef<AddCartToastComponent> | null =
    null;

  constructor(
    private mdbNotificationService: MdbNotificationService,
    private logService: LogService
  ) {}

  // Add item to cart Toast
  openAddProductToCartToast(message: string): void {
    this.cartNotificationRef = this.mdbNotificationService.open(
      AddCartToastComponent,
      {
        data: {
          message,
          closeHandler: () => this.cartNotificationRef?.close(),
        },
        stacking: false,
        position: 'bottom-center',
        autohide: true,
        delay: 2000,
        offset: 90,
      }
    );
    this.cartNotificationRef.onClose.subscribe(() => {
      this.logService.logDebug('Add item to cart Toast is closed');
    });
  }

  // Add item to cart Toast - with Image
  openAddProductToCartImageToast(
    productImage: string,
    produceArea: string,
    productName: string,
    productBrand: string
  ): void {
    this.cartImageNotificationRef = this.mdbNotificationService.open(
      AddCartToastComponent,
      {
        data: {
          productImage,
          produceArea,
          productName,
          productBrand,
          closeHandler: () => this.cartImageNotificationRef?.close(),
        },
        stacking: false,
        position: 'bottom-right',
        autohide: true,
        // autohide: false,
        delay: 2000,
        width: '100%',
        offset: 90,
      }
    );
    this.cartImageNotificationRef.onClose.subscribe(() => {
      this.logService.logDebug('Add item to cart Toast is closed.');
    });
  }
}
