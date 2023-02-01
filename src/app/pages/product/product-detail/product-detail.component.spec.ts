import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonFooterComponent } from 'src/app/components/common-footer/common-footer.component';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { ProductDetailComponent } from './product-detail.component';

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent, CommonFooterComponent],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.storeProduct = PRODUCT_MOCK_DATA[0];
    component.displayHeaderName = PRODUCT_MOCK_DATA[0].product_name;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header name', () => {
    component.isScroll = true;
    fixture.detectChanges();
    const element = fixture.debugElement.query(
      By.css('.header-area ._inner ._ttl')
    ).nativeElement;
    expect(element.textContent).toBe(component.displayHeaderName);
  });

  it('should show the common footer', () => {
    const element = fixture.debugElement.query(
      By.css('.footer .list-group-item')
    ).nativeElement;
    expect(element.textContent).toContain('Store Information');
  });

  it('should set the product name to alt property dinamicaly ', () => {
    const element = fixture.debugElement.query(By.css('.img-area ._top-img'));
    expect(element.properties['alt']).toContain(
      PRODUCT_MOCK_DATA[0].product_name
    );
  });

  it('should show the product name information', () => {
    const element = fixture.debugElement.query(
      By.css('.info-area ._name')
    ).nativeElement;
    expect(element.textContent).toContain(
      `${PRODUCT_MOCK_DATA[0].producing_area} ${PRODUCT_MOCK_DATA[0].product_name} ${PRODUCT_MOCK_DATA[0].brand}`
    );
  });

  it('should show the product tag information', () => {
    const element = fixture.debugElement.query(By.css('._tags')).nativeElement;
    expect(element.textContent).toContain(`${PRODUCT_MOCK_DATA[0].tags[0]}`);
  });

  it('should show the product contents information', () => {
    const element = fixture.debugElement.query(
      By.css('.detail-area ._value')
    ).nativeElement;
    expect(element.textContent).toContain(
      `${PRODUCT_MOCK_DATA[0].internal_capacity}/${PRODUCT_MOCK_DATA[0].unit_range}`
    );
  });

  it('should have images', () => {
    expect(component.hasImages()).toBeTrue();
  });

  it('should have comparison images', () => {
    expect(component.hasCompImages()).toBeTrue();
  });

  it('should calculate discount rate', () => {
    const value = component.calculateDiscountRate(
      PRODUCT_MOCK_DATA[0].standard_price,
      PRODUCT_MOCK_DATA[0].store_price
    );
    expect(value).toBe('90%off');
  });

  it('should calculate taxed value', () => {
    const value = component.calculateTaxedValue(
      PRODUCT_MOCK_DATA[0].store_price
    );
    expect(value).toBe(106);
  });
});
