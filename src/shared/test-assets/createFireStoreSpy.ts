import { of } from 'rxjs';
import {
  PRODUCT_MOCK_DATA,
  SYSTEM_STATUS_MOCK_DATA,
} from './firebase.service.mock-data';

export const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
  snapshotChanges: of(PRODUCT_MOCK_DATA[0]),
});

export const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});
