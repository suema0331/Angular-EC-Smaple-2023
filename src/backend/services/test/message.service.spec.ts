import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MESSAGE_MOCK_DATA } from '../../../shared/test-assets/firebase.service.mock-data';
import { MessageService } from '../message.service';
import {
  afSpy,
  collectionSpy,
} from 'src/shared/test-assets/createFireStoreSpy';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: AngularFirestore, useValue: afSpy },
      ],
    });
    service = TestBed.inject(MessageService);
  });

  it('should call getMessages method and return store-messages value', async () => {
    service.getMessages();
    // Check to see if the spy function has been executed.
    expect(collectionSpy.valueChanges).toHaveBeenCalled();

    service.getMessages().subscribe((actual) => {
      if (!actual[0]) return;
      expect(actual[0]).toEqual(MESSAGE_MOCK_DATA);
    });
  });
});
