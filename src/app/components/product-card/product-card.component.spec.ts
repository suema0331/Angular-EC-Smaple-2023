import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    // API to dynamically configure an application incorporating the component to be tested
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();
    // An object that combines an instance of the generated component with a utility API for testing
    fixture = TestBed.createComponent(ProductCardComponent);
    // A root element corresponding to the generated component
    component = fixture.componentInstance;
    component.storeProduct = PRODUCT_MOCK_DATA[0];
    fixture.detectChanges();

    component.cartItem = {
      productId: '1',
      quantity: 1,
      price: 100,
      dirtyFlag: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the store price', () => {
    // Make assertions targeting the DOM tree built by the component
    const element = fixture.debugElement.query(
      By.css('._price.discount')
    ).nativeElement;
    expect(element.textContent).toBe(`¥${PRODUCT_MOCK_DATA[0].store_price}`);
  });

  it('should show the product name', () => {
    const element = fixture.debugElement.query(
      By.css('.card-text._name')
    ).nativeElement;
    expect(element.textContent).toContain(PRODUCT_MOCK_DATA[0].product_name);
  });

  it('should show the internal capacity', () => {
    const element = fixture.debugElement.query(
      By.css('.card-text._quantity')
    ).nativeElement;
    expect(element.textContent).toContain(
      PRODUCT_MOCK_DATA[0].internal_capacity
    );
  });

  it('should call calculateTaxedValue and show the taxed price', () => {
    const taxed = component.calculateTaxedValue(
      PRODUCT_MOCK_DATA[0].store_price
    );
    const element = fixture.debugElement.query(
      By.css('._tax-price')
    ).nativeElement;
    expect(element.textContent).toContain(`¥${taxed}`);
  });

  // @Input
  it('should correctly render the @Input values', () => {
    const element = fixture.debugElement.query(
      By.css('.add_cart_btn.isClicked')
    ).nativeElement;
    expect(element.textContent).toContain(1);
  });

  // @Output
  it('should emit true on button click', () => {
    spyOn(component.clickPlusHandler, 'emit');
    const buttonElement = fixture.debugElement.nativeElement.querySelector(
      '._expand-cart-plus-btn-area'
    );
    buttonElement.click();
    fixture.detectChanges();
    expect(component.clickPlusHandler.emit).toHaveBeenCalledWith(
      PRODUCT_MOCK_DATA[0]
    );
  });
});
