import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';
import { SearchComponent } from './search.component';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { CommonFooterComponent } from 'src/app/components/common-footer/common-footer.component';
import { RouterTestingModule } from '@angular/router/testing';

const mockNotificationService = jasmine.createSpyObj<NotificationService>(
  'NotificationService',
  ['openAddProductToCartImageToast']
);

@Component({ selector: 'app-product-card', template: '' })
class ProductCardComponent {
  @Input() storeProduct: StoreProductExt = PRODUCT_MOCK_DATA[0];
  @Input() isBackgroundTransparent = true;
}
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        ProductCardComponent,
        CommonFooterComponent,
      ],
      providers: [
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: AngularFirestore, useValue: afSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Results', () => {
    const element = fixture.debugElement.query(
      By.css('.search-result-area ._ttl')
    ).nativeElement;
    expect(element.textContent).toContain('Results');
  });

  it('should be show the common footer', () => {
    const element = fixture.debugElement.query(
      By.css('.footer .list-group-item')
    ).nativeElement;
    expect(element.textContent).toContain('Store Information');
  });
});
