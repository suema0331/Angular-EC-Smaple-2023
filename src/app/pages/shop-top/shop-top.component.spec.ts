import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonFooterComponent } from 'src/app/components/common-footer/common-footer.component';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { ShopTopComponent } from './shop-top.component';

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);
const mockMdbModalService = jasmine.createSpyObj<MdbModalService>(
  'MdbModalService',
  ['open']
);
@Component({ selector: 'app-product-card', template: '' })
class ProductCardComponent {
  @Input() storeProduct: StoreProductExt = PRODUCT_MOCK_DATA[0];
  @Input() isBackgroundTransparent = true;
}
describe('ShopTopComponent', () => {
  let component: ShopTopComponent;
  let fixture: ComponentFixture<ShopTopComponent>;
  let childFixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ShopTopComponent,
        ProductCardComponent,
        CommonFooterComponent,
      ],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
        { provide: MdbModalService, useValue: mockMdbModalService },
      ],
      imports: [RouterTestingModule, MdbCarouselModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.isMenuOpen = false;
    fixture.detectChanges();
    component.recommendedProductList = PRODUCT_MOCK_DATA;
    fixture.detectChanges();

    childFixture = TestBed.createComponent(ProductCardComponent);
    childFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Sample EC', () => {
    const element = fixture.debugElement.query(
      By.css('.top-header ._name')
    ).nativeElement;
    expect(element.textContent).toContain('Sample EC');
  });

  it('should show the search link', () => {
    const element = fixture.debugElement.query(
      By.css('.top-header ._search a')
    ).nativeElement;
    expect(element.textContent).toContain('Search');
  });

  it('should show the recommend area message', () => {
    const element = fixture.debugElement.query(
      By.css('.recommend-area ._ttl')
    ).nativeElement;
    expect(element.textContent).toContain(
      'Recommended products from our staffs'
    );
  });

  it('should show the Favorites button', () => {
    const element = fixture.debugElement.query(
      By.css('.tab-btn-area .btn-outline div')
    ).nativeElement;
    expect(element.textContent).toContain('Favorites');
  });

  it('should link to the Favorites(/favorite) page', () => {
    const element = fixture.debugElement.query(
      By.css('.tab-btn-area .btn-outline')
    );
    console.log(element);
    expect(element.properties['href']).toContain('/favorite');
    expect(element.properties['title']).toBe(
      'This is a link to navigate to the favorit page.'
    );
  });

  it('should show the Register button', () => {
    const element = fixture.debugElement.query(
      By.css('.signup-area .btn_group a')
    );
    expect(element.nativeElement.textContent).toContain('Register');
    expect(element.properties['href']).toContain('/signup');
    expect(element.properties['title']).toContain(
      'This is a link to navigate to the signup page.'
    );
  });

  it('should link to the Login(/login) page', () => {
    const element = fixture.debugElement.query(
      By.css('.signup-area ._login-area a')
    );
    expect(element.nativeElement.textContent).toContain('Log In');
    expect(element.properties['href']).toContain('/login');
    expect(element.properties['title']).toBe(
      'This is a link to navigate to the login page.'
    );
  });

  it('should show the common footer', () => {
    const element = fixture.debugElement.query(
      By.css('.footer .list-group-item')
    ).nativeElement;
    expect(element.textContent).toContain('Store Information');
  });

  it('should be registered the product.', () => {
    console.log(childFixture.componentInstance.storeProduct);
    const childStoreProduct = childFixture.componentInstance.storeProduct;
    expect(childStoreProduct).toEqual(PRODUCT_MOCK_DATA[0]);
  });
});
