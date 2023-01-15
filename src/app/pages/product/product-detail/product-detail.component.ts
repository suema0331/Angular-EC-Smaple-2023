import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CartItem, CartPriceInfo, CartService } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { PriceService } from 'src/app/service/utilities/price-service.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { ProductStatus } from 'src/backend/enums/product_status';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription, map } from 'rxjs';
import { SEOService } from 'src/app/service/utilities/seo.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  screenName = 'ProductDetailComponent';
  screenId = '2_2';

  // Value of the magnified image
  topViewImage = '';
  isSelectedImg = 0;

  productId = '';
  // カートへ追加クリックView用
  isCartClicked = false;
  cartPriceInfo: CartPriceInfo = this.cartService.getCartPriceInfo();
  cartItem: CartItem = {productId: '', quantity: 0, price:0, dirtyFlag: false};

  isOverConstraintMax = false;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;
  displayConstraintTooltip = false;

  isScroll = false;
  isScrollDown = false;
  currentPageYOffset = 0;
  displayHeaderName = '';

  storeProduct = {} as StoreProductExt;
  productDocumentId = '';

  productSubscription: Subscription;

  constructor(
    public locationService: LocationService,
    private location: Location,
    private priceService: PriceService,
    private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private cartService: CartService,
  ) {
    // Get ID from the URL path query
    this.activatedRoute.params.subscribe(params => this.productId = params['productId'])

    // Get A document from tha productId
    this.productSubscription = this.afs.collection<StoreProductExt>('products', (ref) =>
      ref.where('store_product_id', '==', this.productId))
      .snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as StoreProductExt;
          const id = a.payload.doc.id;
          return { docmentId: id, ...data };
        })
      )
    ).subscribe(data => {
          console.log("🌟subscribed Product data")
          console.log(data)

          if (!data[0] || !data[0].store_product_id){
            alert('Product does not exist');
            this.locationService.navigateTo2_1();
          }
          // Check product sales status
          if (data[0].product_status === ProductStatus.disContinued) {
            alert('Access to this page is currently unavailable due to suspension of publication, etc.');
            this.locationService.navigateTo2_1();

          // Display on the screen because the product is not a suspended listing status(disContinued).
          } else {
            this.storeProduct = data[0]
            this.productDocumentId = data[0].docmentId


            // Product names are only displayed when scrolling down, so that users can better see the images.
            this.displayHeaderName = this.getProductDisplayLabel(this.storeProduct.producing_area, this.storeProduct.product_name, this.storeProduct.brand).substring(0, 30);
            if (this.productId !== '') {
              this.cartItem = this.cartService.getCartItem(this.productId);
              if (this.cartItem.quantity > 0){
                this.isCartClicked = true;
              }
            }
            this.seoService.updateTitle( 'Sample Angular EC -  Product Detail Page: ' + this.storeProduct.product_name);
          }

          if (this.storeProduct.product_view_image_list?.length > 0) {
            this.topViewImage = this.storeProduct.product_view_image_list[0].master;
          } else {
            this.topViewImage = '/assets/product/no-image-small.jpg';
          }
    });

    // this.afs.collection<StoreProductExt>('products', (ref) =>
    //     ref.where('store_product_id', '==', this.productId))
    //   .valueChanges()
    //   .subscribe(res => {
    //     console.log(res)
    //     console.log(res[0])
    //     console.log(res[0].tags)

    //     if (!res[0] || !res[0].store_product_id){
    //       alert('Product does not exist');
    //       this.locationService.navigateTo2_1();
    //     }
    //     if (res[0].product_status === ProductStatus.disContinued) {
    //       alert('Access to this page is currently unavailable due to suspension of publication, etc.');
    //       this.locationService.navigateTo2_1();
    //     }
    //     else {
    //       this.storeProduct = res[0]
    //       this.displayHeaderName = this.getProductDisplayLabel(this.storeProduct.producing_area, this.storeProduct.product_name, this.storeProduct.brand).substring(0, 30);
    //       if (this.storeProduct.product_view_image_list?.length > 0){
    //         this.topViewImage = this.storeProduct.product_view_image_list[0].master;
    //         console.log(this.topViewImage)
    //       } else {
    //         this.topViewImage = '/assets/product/no-image-small.jpg';
    //       }

    //     }
    // })
  }

  ngOnInit() {
  //   this.seoService.updateTitle( 'Sample Angular EC -  Product Detail Page for ' + this.storeProduct.product_name);
  //   this.displayHeaderName = this.getProductDisplayLabel(this.storeProduct.producing_area, this.storeProduct.product_name, this.storeProduct.brand).substring(0, 30);
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any): void {
    // Scroll judgment
    if (window.pageYOffset <= 0){
      this.isScroll = false;
    } else {
      this.isScroll = true;

      // Scroll direction judgment
      if (this.currentPageYOffset < window.pageYOffset){
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    }
    this.currentPageYOffset =  window.pageYOffset;
  }


  clickCart(): void{
    this.isCartClicked = true;
    this.addCart();
  }

  addCart(): void{
    if (this.cartItem.quantity >= this.storeProduct.constraint_max) {
      this.isOverConstraintMax = true;
      this.displayConstraintTooltip = true;
      setTimeout(() => {
        this.hideConstraintTooltip();
      }, 1000);
      return;
    }

    // Normal Toast Ver
    // const displayLabel = (this.storeProduct.producing_area ? (this.storeProduct.producing_area + ' ') : '' ) + this.storeProduct.product_name + ' ' + (this.storeProduct.brand ?  this.storeProduct.brand : '' );
    // this.notificationService.openAddProductToCartToast(displayLabel);

    // Image Toast（画像がない場合も考慮）
    const toastImagePath = this.storeProduct.product_images[0].small
      ? this.storeProduct.product_images[0].small
      : '/assets/product/no-image-small.jpg';

    // this.notificationService.openAddProductToCartImageToast(
    //   toastImagePath,
    //   this.storeProduct.producing_area ? this.storeProduct.producing_area : '',
    //   this.storeProduct.product_name,
    //   this.storeProduct.brand ? this.storeProduct.brand : '',
    // );
    this.isOverConstraintMax = false;
    this.displayConstraintTooltip = false;
    this.cartService.incrementItem(this.productId, this.storeProduct.store_price);
  }

  removeCart(): void{
    this.isOverConstraintMax = false;
    this.displayConstraintTooltip = false;
    this.cartService.decrementItem(this.productId);
  }


  getRangeLabel(internalCapacity: string, unitRange: string): string {
    if (internalCapacity && unitRange){
      return internalCapacity + '/' + unitRange ;
    } else {
      return internalCapacity ? internalCapacity : unitRange;
    }
  }

  hasImages(): boolean{
    if (this.storeProduct.product_images.length > 0
      && this.storeProduct.product_images[0].small
      && this.storeProduct.product_images[0].master){
      return true;
    }
    return false;
  }

  hideConstraintTooltip(): void {
    if (this.constraintTooltip){
      this.constraintTooltip.nativeElement.style.display = 'none';
    }
    this.displayConstraintTooltip = false;
  }

  hasCompImages(): boolean{
    if (this.storeProduct.product_view_image_list.length > 0
      && this.storeProduct.product_view_image_list[0].master){
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

  clickFavHandler(): void{
    const docRef = this.afs.collection<StoreProductExt>('products')

    docRef.doc(this.productDocumentId).set({
        ...this.storeProduct,
        favorite_flag: (this.storeProduct.favorite_flag ===  1 ? 0 : 1)
    },
      { merge: true }
    );
  }

  clickScrollImgHandler(i: number, img: string): void{
    this.isSelectedImg = i;
    // Change the magnified image
    this.topViewImage = img;
  }

  handleBack(): void {
    this.location.back();
  }

  getProductDisplayLabel(producingArea: string, productName: string, brand: string): string{
    const displayLabel = (producingArea ? (producingArea + ' ') : '' ) + productName + ' ' + (brand ?  brand : '' );
    return displayLabel;
  }


  cartBtnHandler(): void {
    // this.locationService.navigateTo4_12();
  }

}



