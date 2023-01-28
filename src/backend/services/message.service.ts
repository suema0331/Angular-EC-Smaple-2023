import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { StoreTopMessage } from '../dto/common/store_top_message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private afs: AngularFirestore) {}

  getMessages(): Observable<StoreTopMessage[]> {
    return this.afs
      .collection<StoreTopMessage>('store-messages', (ref) => ref.limit(1))
      .valueChanges();
  }
}
