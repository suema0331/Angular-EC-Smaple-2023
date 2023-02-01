import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { AddCartToastComponent } from './add-cart-toast.component';

describe('AddCartToastComponent', () => {
  let component: AddCartToastComponent;
  let fixture: ComponentFixture<AddCartToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartToastComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
    }).compileComponents();
    fixture = TestBed.createComponent(AddCartToastComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the product image', () => {
    component.productImage = PRODUCT_MOCK_DATA[0].product_images[0].small;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.left-body img'));
    expect(element.attributes['src']).toBe(
      PRODUCT_MOCK_DATA[0].product_images[0].small
    );
  });

  it('should show the produce area', () => {
    component.produceArea = PRODUCT_MOCK_DATA[0].producing_area;
    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.product-name')
    ).nativeElement;
    expect(element.textContent).toContain(PRODUCT_MOCK_DATA[0].producing_area);
  });

  it('should show the product name and product brand', () => {
    component.produceArea = PRODUCT_MOCK_DATA[0].producing_area;
    component.productName = PRODUCT_MOCK_DATA[0].product_name;
    component.productBrand = PRODUCT_MOCK_DATA[0].brand;
    fixture.detectChanges();

    const element = fixture.debugElement.query(
      By.css('.product-name')
    ).nativeElement;
    expect(element.textContent).toContain(
      `${PRODUCT_MOCK_DATA[0].product_name} ${PRODUCT_MOCK_DATA[0].brand}`
    );
  });
});
