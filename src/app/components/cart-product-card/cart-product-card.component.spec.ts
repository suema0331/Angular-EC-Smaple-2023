import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { CartProductCardComponent } from './cart-product-card.component';

describe('CartProductCardComponent', () => {
  let component: CartProductCardComponent;
  let fixture: ComponentFixture<CartProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartProductCardComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProductCardComponent);
    component = fixture.componentInstance;

    component.storeProduct = PRODUCT_MOCK_DATA[0];
    fixture.detectChanges();
    component.cartItem = {
      quantity: 3,
      productId: '1',
      price: 90,
      dirtyFlag: false,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the store price', () => {
    const element = fixture.debugElement.query(
      By.css('.product ._right ._bottom')
    ).nativeElement;
    expect(element.textContent).toContain(
      `¥${PRODUCT_MOCK_DATA[0].store_price}`
    );
  });

  it('should show the product name', () => {
    const element = fixture.debugElement.query(By.css('._name')).nativeElement;
    expect(element.textContent).toContain(PRODUCT_MOCK_DATA[0].product_name);
  });

  it('should show the quantity of the item', () => {
    const quantity = component.cartItem?.quantity;
    const element = fixture.debugElement.query(
      By.css('._quantity-btn')
    ).nativeElement;
    expect(element.textContent).toContain(quantity);
  });

  it('should call calculateTaxedValue and show the taxed price', () => {
    const taxed = component.calculateTaxedValue(
      PRODUCT_MOCK_DATA[0].store_price
    );
    const element = fixture.debugElement.query(By.css('._tax')).nativeElement;
    expect(element.textContent).toContain(`¥${taxed}`);
  });
});
