import { of } from 'rxjs';
import { SYSTEM_STATUS_MOCK_DATA } from './firebase.service.mock-data';

export const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});

export const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});
