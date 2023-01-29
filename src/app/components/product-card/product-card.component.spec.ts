import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import {
  PRODUCT_MOCK_DATA,
  SYSTEM_STATUS_MOCK_DATA,
} from 'src/backend/services/test/firebase.service.mock-data';
import { ProductCardComponent } from './product-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    component.storeProduct = PRODUCT_MOCK_DATA[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the store price', () => {
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
});
