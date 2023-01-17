import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-shop-guide',
  templateUrl: './shop-guide.component.html',
  styleUrls: ['./shop-guide.component.scss'],
})
export class ShopGuideComponent {
  screenName = 'ShopGuideComponent';
  steps = [
    {
      name: 'STEP1',
      title: 'Enjoy a large variety of products!',
      img: './assets/product/master/21.jpg',
      message:
        'We also sell easy-to-cook sets and members-only sale products, only available through online!',
      btn_name: 'Next',
    },
    {
      name: 'STEP2',
      title: 'Find the products you are looking for!',
      img: './assets/product/master/6.jpg',
      message:
        'If you cannot find a product that you like, you can always send us a request. Other feedback is always welcome!',
      btn_name: 'Next',
    },
    {
      name: 'STEP3',
      title: 'Choose a convenient way to pick up your order!',
      img: './assets/product/master/18.jpg',
      message: 'Pick up at the store or choose delivery.',
      btn_name: 'Next',
    },
    {
      name: 'STEP4',
      title: 'Pick up your order',
      img: './assets/product/master/24.jpg',
      message: 'Have a great time!',
      btn_name: "Let's Go!",
      last: true,
    },
  ];

  constructor(public modalRef: MdbModalRef<ShopGuideComponent>) {}
}
