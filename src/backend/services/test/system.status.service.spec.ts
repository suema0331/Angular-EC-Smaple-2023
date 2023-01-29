import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { SystemStatusService } from '../system.status.service';
import { SYSTEM_STATUS_MOCK_DATA } from './firebase.service.mock-data';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';

describe('FirebaseService', () => {
  let service: SystemStatusService;

  const collectionSpy = jasmine.createSpyObj({
    valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
  });
  const afSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SystemStatusService,
        { provide: AngularFirestore, useValue: afSpy },
      ],
    });
    service = TestBed.inject(SystemStatusService);
  });

  it('should call getStatus method and return system-status value', async () => {
    service.getStatus();
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    collectionSpy.valueChanges().subscribe((actual: SystemStatusResponse) => {
      console.log(actual);
      expect(actual).toEqual(SYSTEM_STATUS_MOCK_DATA);
    });

    service.getStatus().subscribe((actual) => {
      console.log('actual status');
      console.log(actual);
      if (!actual[0]) return;
      expect(actual[0]).toEqual(SYSTEM_STATUS_MOCK_DATA);
    });
  });
});
