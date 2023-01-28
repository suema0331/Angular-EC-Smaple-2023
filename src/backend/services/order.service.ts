import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CartToOrder } from '../dto/common/cart_to_order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private afs: AngularFirestore) {}

  getOrderedProducts(userId: string): Observable<CartToOrder[]> {
    return this.afs
      .collection<CartToOrder>('orders', (ref) =>
        ref.where('user_id', '==', userId)
      )
      .valueChanges();
  }

  createOrdereFromCart(
    orderData: CartToOrder
  ): Promise<DocumentReference<CartToOrder>> {
    return this.afs.collection<CartToOrder>('orders').add(orderData);
  }
}
