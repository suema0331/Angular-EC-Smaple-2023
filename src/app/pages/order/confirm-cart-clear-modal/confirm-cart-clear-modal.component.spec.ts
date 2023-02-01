import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { ConfirmCartClearModalComponent } from './confirm-cart-clear-modal.component';

const mockMdbModalRef = jasmine.createSpyObj<
  MdbModalRef<ConfirmCartClearModalComponent>
>('MdbModalRef<ConfirmCartClearModalComponent>', ['close']);

describe('ConfirmCartClearModalComponent', () => {
  let component: ConfirmCartClearModalComponent;
  let fixture: ComponentFixture<ConfirmCartClearModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmCartClearModalComponent],
      providers: [
        { provide: AngularFirestore, useValue: afSpy },
        {
          provide: MdbModalRef<ConfirmCartClearModalComponent>,
          useValue: mockMdbModalRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmCartClearModalComponent);
    component = fixture.componentInstance;
    component.storeProductExt = PRODUCT_MOCK_DATA[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be modal body message', () => {
    const element = fixture.debugElement.query(
      By.css('.modal-body ._message')
    ).nativeElement;
    expect(element.textContent).toContain(
      'Do you want to empty your cart?This operation cannot be undone.'
    );
  });

  it('should show the YES button', () => {
    const element = fixture.debugElement.query(
      By.css('.btn_group .submit')
    ).nativeElement;
    expect(element.textContent).toContain('YES');
  });

  it('should show the NO button', () => {
    const element = fixture.debugElement.query(
      By.css('.btn_group .cancel')
    ).nativeElement;
    expect(element.textContent).toContain('NO');
  });

  it('should call the clickYesHandler and set cart quantity to 0', () => {
    component.clickYesHandler();
    const quantity = component.storeProductExt.cart_quantity;
    expect(quantity).toBe(0);
  });

  it('should call the clickNoHandler and set cart quantity to 1', () => {
    component.clickNoHandler();
    const quantity = component.storeProductExt.cart_quantity;
    expect(quantity).toBe(1);
  });
});
