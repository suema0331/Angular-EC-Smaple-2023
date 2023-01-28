import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { CartItem, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { PriceService } from 'src/app/service/utilities/price.service';
import { ProductImageExt } from 'src/backend/dto/common/product_image_ext';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
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
  @Input() isMoreClicked = false;
  @Input() isBackgroundTransparent = false;
  @Input() isLoggedIn: boolean | null = false;
  @Input() productViewImageType = 0;
  @Input() activeSection = [] as number[];

  @Output() clickPlusHandler: EventEmitter<StoreProductExt> =
    new EventEmitter();
  @Output() clickMinusHandler: EventEmitter<StoreProductExt> =
    new EventEmitter();

  isCartClicked = false;

  cartItem: CartItem | undefined = {
    productId: '',
    quantity: 0,
    price: 0,
    dirtyFlag: false,
  };

  isOverConstraintMax = false;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;
  displayConstraintTooltip = false;
  links = this.locationService.links;

  constructor(
    public locationService: LocationService,
    private logService: LogService,
    private cartService: CartService,
    private priceService: PriceService
  ) {}
  ngOnInit(): void {
    this.logService.logDebug('[cart] product-card ngOnInit');
    if (this.storeProduct.store_product_id !== '') {
      this.cartItem = this.cartService.getCartItem(
        this.storeProduct.store_product_id
      );
    }
  }

  stopPropagation($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();
  }

  hideConstraintTooltip($event: MouseEvent): void {
    this.stopPropagation($event);
    if (this.constraintTooltip) {
      this.constraintTooltip.nativeElement.style.display = 'none';
    }
    this.switchConstraintTooltip(false);
  }

  addCart($event: MouseEvent): void {
    this.stopPropagation($event);
    if (!this.cartItem) return;
    this.isCartClicked = true;

    if (this.cartItem.quantity >= this.storeProduct.constraint_max) {
      this.switchConstraintTooltip(true);
      setTimeout(() => {
        this.hideConstraintTooltip($event);
      }, 1000);
      return;
    }

    this.switchConstraintTooltip(false);
    this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickPlusHandler.emit(this.storeProduct);
  }

  removeCart($event: MouseEvent): void {
    this.stopPropagation($event);
    if (!this.cartItem) return;
    if (
      this.cartItem.quantity < 0 ||
      this.cartItem.quantity > this.storeProduct.constraint_max
    )
      return;

    this.switchConstraintTooltip(false);
    this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickMinusHandler.emit(this.storeProduct);
  }

  switchConstraintTooltip(val: boolean): void {
    this.isOverConstraintMax = val;
    this.displayConstraintTooltip = val;
  }

  calculateDiscountRate(standardPrice: number, storePrice: number): string {
    return this.priceService.calculateDiscountRate(standardPrice, storePrice);
  }

  calculateTaxedValue(price: number): number {
    return this.priceService.calculateTaxedValue(price);
  }

  getImageUrl(imgUrl: string): string {
    return imgUrl;
    // return this.imageUrlService.getImageUrl(this.storeProduct.store_product_id, imgUrl, SizeType.small);
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
    return displayLabel.substring(0, 32);
  }

  getRangeLabel(internalCapacity: string, unitRange: string): string {
    if (internalCapacity && unitRange) {
      return internalCapacity + '/' + unitRange;
    } else {
      return internalCapacity ? internalCapacity : unitRange;
    }
  }
}
