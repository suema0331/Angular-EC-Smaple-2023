import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  CartItem,
  CartPriceInfo,
  CartService,
} from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { PriceService } from 'src/app/service/utilities/price.service';
import { SEOService } from 'src/app/service/utilities/seo.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { ProductStatus } from 'src/backend/enums/product_status';
import { ProductService } from 'src/backend/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  screenName = 'ProductDetailComponent';
  screenId = '2_2';

  storeProduct = {} as StoreProductExt;
  productDocumentId = '';
  productSubscription: Subscription | undefined;
  productId = '';

  isCartClicked = false;
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  cartItem: CartItem | undefined = {
    productId: '',
    quantity: 0,
    price: 0,
    dirtyFlag: false,
  };
  isOverConstraintMax = false;
  isScroll = false;
  isScrollDown = false;
  currentPageYOffset = 0;
  displayHeaderName = '';
  displayConstraintTooltip = false;

  // Value of the magnified image
  topViewImage = '';
  isSelectedImg = 0;

  links = this.locationService.links;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;

  constructor(
    private locationService: LocationService,
    private priceService: PriceService,
    private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private notificationService: NotificationService,
    public location: Location,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get ID from the URL path query
    this.activatedRoute.params.subscribe(
      (params) => (this.productId = params['productId'])
    );
    // Get A document from tha productId
    this.productSubscription = this.productService
      .getProduct(this.productId)
      .subscribe((data) => {
        if (!data[0] || !data[0].store_product_id) {
          alert('Product does not exist');
          this.locationService.navigateTo2_1();
        }
        // Check product sales status
        if (data[0].product_status === ProductStatus.disContinued) {
          alert(
            'Access to this page is currently unavailable due to suspension of publication, etc.'
          );
          this.locationService.navigateTo2_1();

          // Display on the screen because the product is not a suspended listing status(disContinued).
        } else {
          this.storeProduct = data[0];
          this.productDocumentId = data[0].docmentId;

          // Product names are only displayed when scrolling down, so that users can better see the images.
          this.displayHeaderName = this.getProductDisplayLabel(
            this.storeProduct.producing_area,
            this.storeProduct.product_name,
            this.storeProduct.brand
          ).substring(0, 30);
          if (this.productId !== '') {
            this.cartItem = this.cartService.getCartItem(this.productId);
            if (this.cartItem.quantity > 0) {
              this.isCartClicked = true;
            }
          }
          this.seoService.updateTitle(
            'Sample Angular EC -  Product Detail Page: ' +
              this.storeProduct.product_name
          );
        }

        if (this.storeProduct.product_view_image_list?.length > 0) {
          this.topViewImage =
            this.storeProduct.product_view_image_list[0].master;
        } else {
          this.topViewImage = '/assets/product/no-image-small.jpg';
        }
      });
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    // Scroll judgment
    if (window.pageYOffset <= 0) {
      this.isScroll = false;
    } else {
      this.isScroll = true;
      // Scroll direction judgment
      if (this.currentPageYOffset < window.pageYOffset) {
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    }
    this.currentPageYOffset = window.pageYOffset;
  }

  clickCart(): void {
    this.isCartClicked = true;
    this.addCart();
  }

  hideConstraintTooltip(): void {
    if (this.constraintTooltip) {
      this.constraintTooltip.nativeElement.style.display = 'none';
    }
    this.switchConstraintTooltip(false);
  }

  addCart(): void {
    if (!this.cartItem) return;
    if (this.cartItem.quantity >= this.storeProduct.constraint_max) {
      this.switchConstraintTooltip(true);
      setTimeout(() => {
        this.hideConstraintTooltip();
      }, 1000);
      return;
    }
    const toastImagePath = this.storeProduct.product_images[0].small
      ? this.storeProduct.product_images[0].small
      : '/assets/product/no-image-small.jpg';

    this.notificationService.openAddProductToCartImageToast(
      toastImagePath,
      this.storeProduct.producing_area ? this.storeProduct.producing_area : '',
      this.storeProduct.product_name,
      this.storeProduct.brand ? this.storeProduct.brand : ''
    );
    this.switchConstraintTooltip(false);
    this.cartService.incrementItem(
      this.productId,
      this.storeProduct.store_price
    );
  }

  removeCart(): void {
    if (!this.cartItem) return;
    if (
      this.cartItem.quantity < 0 ||
      this.cartItem.quantity > this.storeProduct.constraint_max
    )
      return;
    this.switchConstraintTooltip(false);
    this.cartService.decrementItem(this.productId);
  }

  switchConstraintTooltip(val: boolean): void {
    this.isOverConstraintMax = val;
    this.displayConstraintTooltip = val;
  }

  getRangeLabel(internalCapacity: string, unitRange: string): string {
    if (internalCapacity && unitRange) {
      return internalCapacity + '/' + unitRange;
    } else {
      return internalCapacity ? internalCapacity : unitRange;
    }
  }

  hasImages(): boolean {
    if (
      this.storeProduct.product_images.length > 0 &&
      this.storeProduct.product_images[0].small &&
      this.storeProduct.product_images[0].master
    ) {
      return true;
    }
    return false;
  }

  hasCompImages(): boolean {
    if (
      this.storeProduct.product_view_image_list.length > 0 &&
      this.storeProduct.product_view_image_list[0].master
    ) {
      return true;
    }
    return false;
  }

  getImageUrl(imgUrl: string): string {
    return imgUrl;
    // If we have a backend, I will use ImageService to retrieve images from the backend or S3
    // return this.imageUrlService.getImageUrl(this.storeProduct.store_product_id, imgUrl, SizeType.master);
  }

  calculateDiscountRate(standardPrice: number, storePrice: number): string {
    return this.priceService.calculateDiscountRate(standardPrice, storePrice);
  }

  calculateTaxedValue(price: number): number {
    return this.priceService.calculateTaxedValue(price);
  }

  clickFavHandler(): void {
    this.productService.updateFavorite(
      this.productDocumentId,
      this.storeProduct
    );
  }

  clickScrollImgHandler(i: number, img: string): void {
    this.isSelectedImg = i;
    // Change the magnified image
    this.topViewImage = img;
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
    return displayLabel;
  }
}
