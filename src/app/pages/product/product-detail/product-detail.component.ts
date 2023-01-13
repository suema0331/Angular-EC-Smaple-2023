import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ApplicationService } from 'src/app/service/application.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/domains/cart.service';
import { ImageUrlService, SizeType } from 'src/app/service/utilities/image.url.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { PriceService } from 'src/app/service/utilities/price-service.service';
import { ProductImageExt } from 'src/backend/dto/common/product_image_ext';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { ProductStatus } from 'src/backend/enums/product_status';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';
import {Location} from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map, take } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  screenName = 'ProductDetailComponent';
  screenId = '2_2';

  // 拡大画像初期値
  topViewImage = '';

  // スクロールエリア選択中の画像初期値
  isSelectedImg = 0;


  // ユーザ情報・商品情報
  userId: string | undefined = '';
  productId = '';

  // カートへ追加クリックView用
  // isCartClicked = false;

    isOverConstraintMax = false;

  @ViewChild('constraintTooltip') constraintTooltip!: ElementRef | undefined;
  displayConstraintTooltip = false;

  isScroll = false;
  isScrollDown = false;
  currentPageYOffset = 0;
  displayHeaderName = '';
  // 商品情報
  // storeProduct: StoreProductExt = {
  //   store_product_id: '',
  //   product_name: '',
  //   standard_price: -1,
  //   store_price: -1,
  //   constraint_max: -1,
  //   producing_area: '',
  //   brand: '',
  //   internal_capacity: '',
  //   unit_range: '',
  //   store_comment: '',
  //   tags: [],
  //   product_images: [{
  //     sort_order: -1,
  //     master: '',
  //     medium: '',
  //     small: '',
  //   }],
  //   purchased_flag: 0,
  //   favorite_flag:  0,
  //   product_status: 0,
  //   cart_quantity: 0,
  //   product_view_image_list: new Array<ProductImageExt>(),
  // };

  // storeProduct$: Observable<StoreProductExt[]>;
  storeProduct = {} as StoreProductExt;

  constructor(
    private appService: ApplicationService,
    public locationService: LocationService,
    private logService: LogService,
    private location: Location,
    private cartService: CartService,
    private storageService: StorageService,
    private authService: AuthService,
    private modalService: MdbModalService,
    private router: Router,
    private imageUrlService: ImageUrlService,
    private priceService: PriceService,
    // private seoService: SEOService,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
  ) {
    // Get ID from the URL path query
    this.activatedRoute.params.subscribe(params => this.productId = params['productId'])
    console.log(this.productId)

    // this.storeProduct$ =
    //   this.afs.collection<StoreProductExt>('products', (ref) =>
    //     ref.where('store_product_id', '==', this.productId))
    //     .valueChanges();


    this.afs.collection<StoreProductExt>('products', (ref) =>
        ref.where('store_product_id', '==', this.productId))
      .valueChanges()
      .subscribe(res => {
        console.log(res)
        console.log(res[0])
        console.log(res[0].tags)

        if (!res[0] || !res[0].store_product_id){
          alert('Product does not exist');
          this.locationService.navigateTo2_1();
        }
        if (res[0].product_status === ProductStatus.disContinued) {
          alert('Access to this page is currently unavailable due to suspension of publication, etc.');
          this.locationService.navigateTo2_1();
        }
        else {
          this.storeProduct = res[0]
          this.displayHeaderName = this.getProductDisplayLabel(this.storeProduct.producing_area, this.storeProduct.product_name, this.storeProduct.brand).substring(0, 30);
        if (this.storeProduct.product_view_image_list?.length > 0){
          this.topViewImage = this.storeProduct.product_view_image_list[0].master;
          console.log(this.topViewImage)
    } else {
      this.topViewImage = '/assets/product/no-image-small.jpg';
    }

        }
    })
    // productRef.get()
    //   .subscribe(snapshot => {
    //     snapshot.forEach(doc => {
    //       console.log(`${doc.id}: ${doc.data()}`);
    //       return doc.data() as StoreProductExt;
    //     })
    //   })

    console.log(this.storeProduct)

  //   this.storeProduct$ = productRef.get().then(snapshot => {
  // snapshot.forEach(doc => {
  //   console.log(`${doc.id}: ${doc.data().userName}`);
  // })
// })
  }

  ngOnInit() {
    console.log("ngOninit")
    console.log(this.storeProduct)
      // this.seoService.updateTitle( 'Sample Angular EC -  Product Detail Page - ' + this.storeProduct.product_name);
    this.displayHeaderName = this.getProductDisplayLabel(this.storeProduct.producing_area, this.storeProduct.product_name, this.storeProduct.brand).substring(0, 30);

    if (this.storeProduct.product_view_image_list?.length > 0){
      this.topViewImage = this.storeProduct.product_view_image_list[0].master;
      console.log(this.topViewImage)
    } else {
      this.topViewImage = '/assets/product/no-image-small.jpg';
    }

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any): void {
    // スクロール判定
    if (window.pageYOffset <= 0){
      this.isScroll = false;
    } else {
      this.isScroll = true;

      // スクロール方向判定
      if (this.currentPageYOffset < window.pageYOffset){
        this.isScrollDown = true;
      } else {
        this.isScrollDown = false;
      }
    }
    this.currentPageYOffset =  window.pageYOffset;
  }


  getProductDetail(productId: string): void{
      // 価格などのカート情報を取得(バッチ表示用)
      // this.cartPriceInfo = this.cartService.getCartPriceInfo();

      // if (productId !== '') {
      //   this.cartItem = this.cartService.getCartItem(productId);
      //   if (this.cartItem.quantity > 0){
      //     this.isCartClicked = true;
      //   }
      // }
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
    console.log(imgUrl)
    return imgUrl;
    // return this.imageUrlService.getImageUrl(this.storeProduct.store_product_id, imgUrl, SizeType.master);
  }

  calculateDiscountRate(standardPrice: number, storePrice: number): string {
    return this.priceService.calculateDiscountRate(standardPrice, storePrice);
  }

  calculateTaxedValue(price: number): number {
    return this.priceService.calculateTaxedValue(price);
  }

  clickFavHandler(): void{
    if (!this.userId) {
      // this.openSignUpDialog();
      return;
    } else if (this.storeProduct.favorite_flag === 0) {
      // this.appService.createUserFavorite( this.userId, this.productId ).subscribe(
      //   (res) => {
      //     // 追加成功したら、色付きのハートに変更
      //     if (res.status_code === 0){
      //       this.storeProduct.favorite_flag = 1;
      //     }
      //   });
    } else if (this.storeProduct.favorite_flag === 1) {
      // this.appService.deleteUserFavorite( this.userId, this.productId ).subscribe(
      //   (res) => {
      //     // 削除成功したら、色無しのハートに変更
      //     if (res.status_code === 0){
      //       this.storeProduct.favorite_flag = 0;
      //     }
      //   });
    }
  }

  clickScrollImgHandler(i: number, img: string): void{
    this.isSelectedImg = i;
    // 拡大画像を変更
    this.topViewImage = img;
  }

  handleBack(): void {
    this.location.back();
  }

  getProductDisplayLabel(producingArea: string, productName: string, brand: string): string{
    const displayLabel = (producingArea ? (producingArea + ' ') : '' ) + productName + ' ' + (brand ?  brand : '' );
    return displayLabel;
  }

}



