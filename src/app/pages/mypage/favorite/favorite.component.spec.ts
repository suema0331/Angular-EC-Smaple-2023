import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { CommonHeaderComponent } from 'src/app/components/common-header/common-header.component';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { FavoriteComponent } from './favorite.component';

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);

@Component({ selector: 'app-product-card', template: '' })
class ProductCardComponent {
  @Input() storeProduct: StoreProductExt = PRODUCT_MOCK_DATA[0];
  @Input() isBackgroundTransparent = true;
}
describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FavoriteComponent,
        CommonHeaderComponent,
        ProductCardComponent,
      ],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Favorite Product List', () => {
    const element = fixture.debugElement.query(By.css('.header')).nativeElement;
    expect(element.textContent).toContain('Favorite Product List');
  });
});
