import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SystemStatusService } from '../system.status.service';
import { SYSTEM_STATUS_MOCK_DATA } from '../../../shared/test-assets/firebase.service.mock-data';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';
import {
  afSpy,
  collectionSpy,
} from 'src/shared/test-assets/createFireStoreSpy';

describe('SystemStatusService', () => {
  let service: SystemStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SystemStatusService,
        { provide: AngularFirestore, useValue: afSpy },
      ],
    });
    service = TestBed.inject(SystemStatusService);
  });

  it('should call getSystemStatus method and return system-status value', async () => {
    service.getSystemStatus();
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    collectionSpy.valueChanges().subscribe((actual: SystemStatusResponse) => {
      expect(actual).toEqual(SYSTEM_STATUS_MOCK_DATA);
    });

    service.getSystemStatus().subscribe((actual) => {
      if (!actual[0]) return;
      expect(actual[0]).toEqual(SYSTEM_STATUS_MOCK_DATA);
    });
  });
});
