import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { CART_PRICE_INFO_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { CartComponent } from './cart.component';

const mockMdbModalService = jasmine.createSpyObj<MdbModalService>(
  'MdbModalService',
  ['open']
);
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: AngularFirestore, useValue: afSpy },
        { provide: MdbModalService, useValue: mockMdbModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.cartPriceInfo = CART_PRICE_INFO_MOCK_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as YOUR CART', () => {
    const element = fixture.debugElement.query(
      By.css('.cart-header ._inner')
    ).nativeElement;
    expect(element.textContent).toContain('YOUR CART');
  });

  it('should show the Empty Cart button', () => {
    const element = fixture.debugElement.query(
      By.css('.empty-cart-button')
    ).nativeElement;
    expect(element.textContent).toContain('Empty Cart');
  });

  it('should show the total product price without tax', () => {
    const element = fixture.debugElement.query(
      By.css('.order-area ._red')
    ).nativeElement;
    expect(element.textContent).toContain(
      CART_PRICE_INFO_MOCK_DATA.totalProductPriceWithoutTax
    );
  });

  it('should show the total product price with tax', () => {
    const element = fixture.debugElement.query(
      By.css('.tax-price span')
    ).nativeElement;
    expect(element.textContent).toContain(
      CART_PRICE_INFO_MOCK_DATA.totalProductPriceWithTax
    );
  });
});
