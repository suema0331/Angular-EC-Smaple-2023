import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { SystemStatusResponse } from '../dto/common/system_status_response';

@Injectable({
  providedIn: 'root',
})
export class SystemStatusService {
  constructor(private afs: AngularFirestore) {}

  getStatus(): Observable<SystemStatusResponse[]> {
    return this.afs
      .collection<SystemStatusResponse>('system-status', (ref) => ref.limit(1))
      .valueChanges();
  }
}
