import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { OrderService } from '../order.service';
import { ORDER_MOCK_DATA } from '../../../shared/test-assets/firebase.service.mock-data';
import { NotificationService } from 'src/app/service/utilities/notification.service';
import {
  afSpy,
  collectionSpy,
} from 'src/shared/test-assets/createFireStoreSpy';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService,
        { provide: AngularFirestore, useValue: afSpy },
        { provide: NotificationService, useValue: [] },
      ],
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
        if (!actual[0]) return;
        expect(actual[0]).toEqual(ORDER_MOCK_DATA);
      });
  });
});
