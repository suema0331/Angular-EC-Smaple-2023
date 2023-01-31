import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { PRODUCT_MOCK_DATA } from 'src/shared/test-assets/firebase.service.mock-data';

describe('ProductService', () => {
  let service: ProductService;

  const collectionSpy = jasmine.createSpyObj({
    valueChanges: of(PRODUCT_MOCK_DATA),
  });
  const afSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: AngularFirestore, useValue: afSpy },
      ],
    });
    service = TestBed.inject(ProductService);
  });

  it('should call getProducts method and return products value', async () => {
    service.getProducts();
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    service.getProducts().subscribe((actual) => {
      console.log('actual products');
      console.log(actual);
      if (!actual) return;
      expect(actual).toEqual(PRODUCT_MOCK_DATA);
    });
  });

  it('should call getFavoriteProducts method and return products value', async () => {
    service.getFavoriteProducts();
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    service.getFavoriteProducts().subscribe((actual) => {
      console.log('actual favorites');
      console.log(actual);
      if (!actual) return;
      expect(actual).toEqual(PRODUCT_MOCK_DATA);
    });
  });
});
