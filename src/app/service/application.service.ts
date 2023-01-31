import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CartToOrder } from 'src/backend/dto/common/cart_to_order';
import { StoreProductExt } from 'src/backend/dto/common/store_product_ext';
import { StoreTopMessage } from 'src/backend/dto/common/store_top_message';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';
import { MessageService } from 'src/backend/services/message.service';
import { OrderService } from 'src/backend/services/order.service';
import { ProductService } from 'src/backend/services/product.service';
import { SystemStatusService } from 'src/backend/services/system.status.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  /**
   * Services for the Application layer.
   * The front-end calls the app service and does not call the backend service form ./backend/services directly.
   * In ApplicationService, the backend services that the frontend wants to invoke
   *  are centrally managed in the application layer (ApplicationService)
   *  */
  constructor(
    private messageService: MessageService,
    private orderService: OrderService,
    private productService: ProductService,
    private systemStatusService: SystemStatusService
  ) {}

  // e.g. Recommended products for the user on the TOP oage
  // getUserRecommendations(storeId: string, userId: string): Observable<[StoreProductExt]> {
  //   return this.userQueryRestUserServiceExt.getUserRecommendations(storeId, userId);
  // }

  getProducts(limit = 20): Observable<StoreProductExt[]> {
    return this.productService.getProducts(limit);
  }

  getProduct(
    productId: string
  ): Observable<(StoreProductExt & { docmentId: string })[]> {
    return this.productService.getProduct(productId);
  }

  getFavoriteProducts(): Observable<StoreProductExt[]> {
    return this.productService.getFavoriteProducts();
  }

  updateFavorite(docId: string, storeProduct: StoreProductExt): boolean {
    return this.productService.updateFavorite(docId, storeProduct);
  }

  getOrderedProducts(userId: string): Observable<CartToOrder[]> {
    return this.orderService.getOrderedProducts(userId);
  }

  createOrdereFromCart(
    orderData: CartToOrder
  ): Promise<DocumentReference<CartToOrder>> {
    return this.orderService.createOrdereFromCart(orderData);
  }

  getMessages(): Observable<StoreTopMessage[]> {
    return this.messageService.getMessages();
  }

  getSystemStatus(): Observable<SystemStatusResponse[]> {
    return this.systemStatusService.getSystemStatus();
  }
}
