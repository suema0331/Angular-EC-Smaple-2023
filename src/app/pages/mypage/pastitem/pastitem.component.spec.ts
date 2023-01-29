import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CommonHeaderComponent } from 'src/app/components/common-header/common-header.component';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import {
  PRODUCT_MOCK_DATA,
  SYSTEM_STATUS_MOCK_DATA,
} from 'src/backend/services/test/firebase.service.mock-data';
import { PastitemComponent } from './pastitem.component';

const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);

@Component({ selector: 'app-product-card', template: '' })
class ProductCardComponent {
  @Input() storeProduct: StoreProductExt = PRODUCT_MOCK_DATA[0];
  @Input() isBackgroundTransparent = true;
}
describe('PastitemComponent', () => {
  let component: PastitemComponent;
  let fixture: ComponentFixture<PastitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PastitemComponent,
        CommonHeaderComponent,
        ProductCardComponent,
      ],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PastitemComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Purchased Product List', () => {
    const element = fixture.debugElement.query(By.css('.header')).nativeElement;
    expect(element.textContent).toContain('Purchased Product List');
  });
});
