import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { MESSAGE_MOCK_DATA } from './firebase.service.mock-data';
import { MessageService } from '../message.service';

describe('MessageService', () => {
  let service: MessageService;

  const collectionSpy = jasmine.createSpyObj({
    valueChanges: of(MESSAGE_MOCK_DATA),
  });
  const afSpy = jasmine.createSpyObj('AngularFirestore', {
    collection: collectionSpy,
  });

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
      console.log('actual message');
      console.log(actual);
      if (!actual[0]) return;
      expect(actual[0]).toEqual(MESSAGE_MOCK_DATA);
    });
  });
});
