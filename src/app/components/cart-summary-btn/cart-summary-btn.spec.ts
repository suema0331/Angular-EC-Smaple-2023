import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { CART_PRICE_INFO_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { CartSummaryBtnComponent } from './cart-summary-btn.component';

describe('CartSummaryBtnComponent', () => {
  let component: CartSummaryBtnComponent;
  let fixture: ComponentFixture<CartSummaryBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartSummaryBtnComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSummaryBtnComponent);
    component = fixture.componentInstance;

    component.cartPriceInfo = CART_PRICE_INFO_MOCK_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the number of products', () => {
    const element = fixture.debugElement.query(
      By.css('._quantity')
    ).nativeElement;
    expect(element.textContent).toBe(
      `${CART_PRICE_INFO_MOCK_DATA.numOfStoreProducts}`
    );
  });

  it('should show the total product price without tax', () => {
    const element = fixture.debugElement.query(By.css('._price')).nativeElement;
    expect(element.textContent).toContain(
      CART_PRICE_INFO_MOCK_DATA.totalProductPriceWithoutTax
    );
  });

  it('should show the total product price with tax', () => {
    const element = fixture.debugElement.query(
      By.css('._tax-price')
    ).nativeElement;
    expect(element.textContent).toContain(
      CART_PRICE_INFO_MOCK_DATA.totalProductPriceWithTax
    );
  });
});
