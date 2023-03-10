import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonFooterComponent } from 'src/app/components/common-footer/common-footer.component';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { ProductListComponent } from './product-list.component';

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);

@Component({ selector: 'app-product-card', template: '' })
class ProductCardComponent {
  @Input() storeProduct: StoreProductExt = PRODUCT_MOCK_DATA[0];
  @Input() isBackgroundTransparent = true;
}
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let childFixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        ProductCardComponent,
        CommonFooterComponent,
      ],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.productList = PRODUCT_MOCK_DATA;

    childFixture = TestBed.createComponent(ProductCardComponent);

    fixture.detectChanges();
    childFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as All Products', () => {
    const element = fixture.debugElement.query(
      By.css('.section ._ttl')
    ).nativeElement;
    expect(element.textContent).toContain('All Products');
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
