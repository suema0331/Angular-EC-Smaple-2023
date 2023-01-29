import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { OrderService } from '../order.service';
import { ORDER_MOCK_DATA } from './firebase.service.mock-data';

describe('FirebaseService', () => {
  let service: OrderService;

  const collectionSpy = jasmine.createSpyObj({
    valueChanges: of(ORDER_MOCK_DATA),
  });
  const afSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService, { provide: AngularFirestore, useValue: afSpy }],
    });
    service = TestBed.inject(OrderService);
  });

  it('should call getOrderedProducts method and return orders value', async () => {
    service.getOrderedProducts('MQyclRM9Z7WA7oLsOiIdKz3Fd5w2');
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    service
      .getOrderedProducts('MQyclRM9Z7WA7oLsOiIdKz3Fd5w2')
      .subscribe((actual) => {
        console.log('actual orders');
        console.log(actual);
        if (!actual[0]) return;
        expect(actual[0]).toEqual(ORDER_MOCK_DATA);
      });
  });
});
