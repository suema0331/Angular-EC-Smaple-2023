import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { StoreProductExt } from '../dto/common/store_product_ext';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore) {}

  getProducts(limit = 20): Observable<StoreProductExt[]> {
    return this.afs
      .collection<StoreProductExt>('products', (ref) => ref.limit(limit))
      .valueChanges();
  }

  getProduct(
    productId: string
  ): Observable<(StoreProductExt & { docmentId: string })[]> {
    return this.afs
      .collection<StoreProductExt>('products', (ref) =>
        ref.where('store_product_id', '==', productId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as StoreProductExt;
            const id = a.payload.doc.id;
            return { docmentId: id, ...data };
          })
        )
      );
  }

  // If another field is used in the operation and orderby used in the where condition, a composite index is required.
  // https://cloud.google.com/firestore/docs/query-data/indexing
  getFavoriteProducts(): Observable<StoreProductExt[]> {
    return this.afs
      .collection<StoreProductExt>('products', (ref) =>
        ref
          .where('favorite_flag', '==', 1)
          // Sort sold-out items so that they come last.
          .orderBy('product_status', 'asc')
      )
      .valueChanges();
  }

  updateFavorite(docId: string, storeProduct: StoreProductExt): boolean {
    const docRef = this.afs.collection<StoreProductExt>('products');
    docRef
      .doc(docId)
      .set(
        {
          ...storeProduct,
          favorite_flag: storeProduct.favorite_flag === 1 ? 0 : 1,
        },
        { merge: true }
      )
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  }
}
