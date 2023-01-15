import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CONSTRAINT_MAX } from 'src/app/extra/constants';
import { ApplicationService } from 'src/app/service/application.service';
import { CartItem, CartService } from 'src/app/service/domains/cart.service';
import { ImageUrlService, SizeType } from 'src/app/service/utilities/image.url.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { PriceService } from 'src/app/service/utilities/price-service.service';
import { ProductImageExt } from 'src/backend/dto/common/product_image_ext';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { LogService } from 'src/shared/services/log.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() storeProduct: StoreProductExt = {
    store_product_id: '',
    product_name: '',
    // product_code: '',
    standard_price: 0,
    // standard_price_with_tax: 0,
    store_price: 0,
    // store_price_with_tax: 0,
    // tax_rate: 0,
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
    cart_quantity: 0, // 使わない
    product_view_image_list: new Array<ProductImageExt>(),
  };
  @Input() isMoreClicked = false;
  @Input() isBackgroundTransparent = false;
  @Input() isLoggedIn: boolean | null = false;
  @Input() productViewImageType = 0;

  @Input() activeSection = [] as number[];

  @Output() clickPlusHandler: EventEmitter<StoreProductExt> = new EventEmitter();
  @Output() clickMinusHandler: EventEmitter<StoreProductExt> = new EventEmitter();

  isCartClicked = false;

  cartItem: CartItem = {productId: '', quantity: 0, price:0, dirtyFlag: false};

  isOverConstraintMax = false;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;
  displayConstraintTooltip = false;

  // signupDialogRef: MdbModalRef<SignupDialogPageComponent> | undefined;

  constructor(
    public locationService: LocationService,
    private logService: LogService,
    private appService: ApplicationService,
    private cartService: CartService,
    private modalService: MdbModalService,
    private imageUrlService: ImageUrlService,
    private priceService: PriceService,
  ) {

  }
  ngOnInit(): void {
    this.logService.logDebug('[cart] product-card ngOnInit');

    if (this.storeProduct.store_product_id !== '') {
      this.cartItem = this.cartService.getCartItem(this.storeProduct.store_product_id);
    }
  }

  hideConstraintTooltip(): void {
    if (this.constraintTooltip){
      this.constraintTooltip.nativeElement.style.display = 'none';
    }
    this.displayConstraintTooltip = false;
  }

  addCart($event: any): void {
    this.logService.logDebug('addCart');
    this.isCartClicked = true;
    $event.stopPropagation();
    $event.preventDefault();
    if (!this.isLoggedIn){
      // this.openSignUpDialog();
      // return;
    }

    // 上限購入可能個数を超えていたらtooltipをだす
    if (this.cartItem.quantity >= this.storeProduct.constraint_max){
      this.isOverConstraintMax = true;
      this.displayConstraintTooltip = true;

      // display flexの親であるためscssアニメーションだけでは消えない
      setTimeout(() => {
        this.hideConstraintTooltip();
      }, 1000);

      return;

    } else {
      this.isOverConstraintMax = false;
      this.displayConstraintTooltip = false;
    }
    // this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickPlusHandler.emit(this.storeProduct);
  }

  removeCart($event: any): void {
    this.logService.logDebug('removeCart');
    $event.stopPropagation();
    $event.preventDefault();

    this.isOverConstraintMax = false;
    this.displayConstraintTooltip = false;

    // this.storeProduct.cart_quantity = this.cartItem.quantity;
    this.clickMinusHandler.emit(this.storeProduct);
  }


  calculateDiscountRate(standardPrice: number, storePrice: number, ): string {
    return this.priceService.calculateDiscountRate(standardPrice, storePrice);
  }

  calculateTaxedValue(price: number): number {
    return this.priceService.calculateTaxedValue(price);
  }

  getImageUrl(imgUrl: string): string {
    return imgUrl
    // return this.imageUrlService.getImageUrl(this.storeProduct.store_product_id, imgUrl, SizeType.small);
  }

  getProductDisplayLabel(producingArea: string, productName: string, brand: string): string{
    const displayLabel = (producingArea ? (producingArea + ' ') : '' ) + productName + ' ' + (brand ?  brand : '' );
    // return this.isMoreClicked ? displayLabel.substring(0, 21) : displayLabel.substring(0, 14);
    // 一律14文字に変更
    // return displayLabel.substring(0, 14);
    return displayLabel.substring(0, 32);
  }

  getRangeLabel(internalCapacity: string, unitRange: string): string {
    if (internalCapacity && unitRange){
      return internalCapacity + '/' + unitRange ;
    } else {
      return internalCapacity ? internalCapacity : unitRange;
    }
  }

  openSignUpDialog(): void{
    // this.signupDialogRef = this.modalService.open(SignupDialogPageComponent,
    //   {
    //     modalClass: 'modal-dialog-centered'
    //   }
    // );
  }
}
