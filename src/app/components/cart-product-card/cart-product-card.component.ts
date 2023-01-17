import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartItem, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { PriceService } from 'src/app/service/utilities/price.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { ProductImageExt } from '../../../backend/dto/common/product_image_ext';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss'],
})
export class CartProductCardComponent implements OnInit {
  screenName = 'CartProductCardComponent';
  screenId = '4_1';

  @Input() storeProduct: StoreProductExt = {
    store_product_id: '',
    product_name: '',
    standard_price: 0,
    store_price: 0,
    constraint_max: CONSTRAINT_MAX,
    producing_area: '',
    brand: '',
    internal_capacity: '',
    unit_range: '',
    store_comment: '',
    tags: [],
    product_images: [],
    purchased_flag: 0,
    favorite_flag: 0,
    product_status: 0,
    cart_quantity: 0,
    product_view_image_list: new Array<ProductImageExt>(),
  };
  @Input() productViewImageType = 0;

  @Output() clickPlusHandler: EventEmitter<StoreProductExt> =
    new EventEmitter();
  @Output() clickMinusHandler: EventEmitter<StoreProductExt> =
    new EventEmitter();
  @Output() clickRemoveAllHandler: EventEmitter<StoreProductExt> =
    new EventEmitter();

  cartItem: CartItem = {
    productId: '',
    quantity: 0,
    price: 0,
    dirtyFlag: false,
  };
  isOverConstraintMax = false;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;
  displayConstraintTooltip = false;

  constructor(
    private cartService: CartService,
    private priceService: PriceService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    if (this.storeProduct.store_product_id !== '') {
      this.cartItem = this.cartService.getCartItem(
        this.storeProduct.store_product_id
      );
    }
  }

  clickCart($event: any): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.addCart($event);
  }

  hideConstraintTooltip(): void {
    if (this.constraintTooltip) {
      this.constraintTooltip.nativeElement.style.display = 'none';
    }
    this.displayConstraintTooltip = false;
  }

  addCart($event: any): void {
    $event.stopPropagation();
    $event.preventDefault();

    if (this.cartItem.quantity >= this.storeProduct.constraint_max) {
      this.isOverConstraintMax = true;
      this.displayConstraintTooltip = true;
      setTimeout(() => {
        this.hideConstraintTooltip();
      }, 1000);
      return;
    } else {
      this.isOverConstraintMax = false;
      this.displayConstraintTooltip = false;
    }
    this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickPlusHandler.emit(this.storeProduct);
  }

  removeCart($event: any): void {
    $event.stopPropagation();
    $event.preventDefault();

    this.isOverConstraintMax = false;
    this.displayConstraintTooltip = false;

    this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickMinusHandler.emit(this.storeProduct);
  }

  removeAllFromCart(): void {
    this.clickRemoveAllHandler.emit(this.storeProduct);
  }

  navigateToProduct(): void {
    this.locationService.navigateTo(
      `/products/${this.storeProduct.store_product_id}`
    );
  }

  getImageUrl(imgUrl: string): string {
    // return this.imageUrlService.getImageUrl(storeProductId, imgUrl, SizeType.small);
    return imgUrl;
  }

  getProductDisplayLabel(
    producingArea: string,
    productName: string,
    brand: string
  ): string {
    const displayLabel =
      (producingArea ? producingArea + ' ' : '') +
      productName +
      ' ' +
      (brand ? brand : '');
    return displayLabel.substring(0, 35);
  }

  calculateTaxedValue(price: number): number {
    return this.priceService.calculateTaxedValue(price);
  }
}
