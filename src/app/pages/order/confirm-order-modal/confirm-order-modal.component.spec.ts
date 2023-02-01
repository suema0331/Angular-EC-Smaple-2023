import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { ConfirmOrderModalComponent } from './confirm-order-modal.component';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';

const mockMdbModalRef = jasmine.createSpyObj<
  MdbModalRef<ConfirmOrderModalComponent>
>('MdbModalRef<ConfirmOrderModalComponent>', ['close']);

describe('ConfirmOrderModalComponent', () => {
  let component: ConfirmOrderModalComponent;
  let fixture: ComponentFixture<ConfirmOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmOrderModalComponent],
      providers: [
        { provide: AngularFirestore, useValue: afSpy },
        {
          provide: MdbModalRef<ConfirmOrderModalComponent>,
          useValue: mockMdbModalRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderModalComponent);
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
      'Would you like to confirm your order?This operation cannot be undone.'
    );
  });

  it('should be show the STEP image', () => {
    const element = fixture.debugElement.query(
      By.css('.btn_group .submit')
    ).nativeElement;
    expect(element.textContent).toContain('YES');
  });

  it('should be show the STEP image', () => {
    const element = fixture.debugElement.query(
      By.css('.btn_group .cancel')
    ).nativeElement;
    expect(element.textContent).toContain('CANCEL');
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
