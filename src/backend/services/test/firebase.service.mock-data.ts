import { CartToOrder } from 'src/backend/dto/common/cart_to_order';
import { StoreTopMessage } from 'src/backend/dto/common/store_top_message';
import { SystemStatusResponse } from 'src/backend/dto/common/system_status_response';
import { AvailableFlag } from 'src/backend/enums/available_flag';

export const SYSTEM_STATUS_MOCK_DATA: SystemStatusResponse = {
  user_app_run_status: 1,
  admin_app_run_status: 1,
};

export const MESSAGE_MOCK_DATA: StoreTopMessage = {
  notice_available_flag: AvailableFlag.unavailable,
  notice1: 'We are having a special sale until the 26th!',
  notice2: '*We will be closed on January 27th.',
  store_available_flag: AvailableFlag.available,
  operation_message:
    'We are currently unable to accept orders due to store holidays. Please place your order again after the 28th.',
};

export const PRODUCT_MOCK_DATA = [
  {
    store_product_id: '1',
    product_name: 'Apple',
    standard_price: 999,
    store_price: 99,
    constraint_max: 10,
    producing_area: 'Germany',
    brand: 'Good-brand',
    internal_capacity: '1 bag',
    unit_range: '2~3 pcs.',
    store_comment: 'Very Good Taste!',
    tags: ['NEW', 'FRESH', 'NICE PRICE', 'LIMITED'],
    product_images: [
      {
        small: '/assets/product/small/44.jpg',
        master: '/assets/product/master/44.jpg',
      },
    ],
    purchased_flag: 0,
    favorite_flag: 1,
    product_status: 1,
    cart_quantity: 0,
    product_view_image_list: [
      {
        small: '/assets/product/small/44.jpg',
        master: '/assets/product/master/44.jpg',
      },
      {
        small: '/assets/product/small/17.jpg',
        master: '/assets/product/master/17.jpg',
      },
      {
        small: '/assets/product/small/18.jpg',
        master: '/assets/product/master/18.jpg',
      },
      {
        small: '/assets/product/small/25.jpg',
        master: '/assets/product/master/25.jpg',
      },
      {
        small: '/assets/product/small/22.jpg',
        master: '/assets/product/master/22.jpg',
      },
      {
        small: '/assets/product/small/21.jpg',
        master: '/assets/product/master/21.jpg',
      },
      {
        small: '/assets/product/small/29.jpg',
        master: '/assets/product/master/29.jpg',
      },
      {
        small: '/assets/product/small/35.jpg',
        master: '/assets/product/master/35.jpg',
      },
    ],
  },
  {
    store_product_id: '2',
    product_name: 'Osterkuchen',
    standard_price: 100,
    store_price: 90,
    constraint_max: 10,
    producing_area: 'Germany',
    brand: 'Great-brand',
    internal_capacity: '1 bag',
    unit_range: '2~3 pcs.',
    store_comment: 'Very Good Taste!',
    tags: ['NEW', 'NICE', 'LIMITED'],
    product_images: [
      {
        small: '/assets/product/small/6.jpg',
        master: '/assets/product/master/6.jpg',
      },
    ],
    purchased_flag: 0,
    favorite_flag: 1,
    product_status: 1,
    cart_quantity: 0,
    product_view_image_list: [
      {
        small: '/assets/product/small/6.jpg',
        master: '/assets/product/master/6.jpg',
      },
      {
        small: '/assets/product/small/2.jpg',
        master: '/assets/product/master/2.jpg',
      },
      {
        small: '/assets/product/small/21.jpg',
        master: '/assets/product/master/21.jpg',
      },
      {
        small: '/assets/product/small/29.jpg',
        master: '/assets/product/master/29.jpg',
      },
      {
        small: '/assets/product/small/35.jpg',
        master: '/assets/product/master/35.jpg',
      },
      {
        small: '/assets/product/small/7.jpg',
        master: '/assets/product/master/7.jpg',
      },
      {
        small: '/assets/product/small/8.jpg',
        master: '/assets/product/master/8.jpg',
      },
      {
        small: '/assets/product/small/9.jpg',
        master: '/assets/product/master/9.jpg',
      },
    ],
  },
];

export const ORDER_MOCK_DATA: CartToOrder = {
  user_id: 'MQyclRM9Z7WA7oLsOiIdKz3Fd5w2',
  order_date: new Date(),
  order_products: PRODUCT_MOCK_DATA,
};
