import {Component, Input, OnInit} from '@angular/core';
import { CartPriceInfo } from 'src/app/service/domains/cart.service';
import { LocationService } from 'src/app/service/utilities/location.service';

@Component({
  selector: 'app-cart-summary-btn',
  templateUrl: './cart-summary-btn.component.html',
  styleUrls: ['./cart-summary-btn.component.scss']
})

export class CartSummaryBtnComponent {
  @Input() cartPriceInfo: CartPriceInfo = {
    totalProductPriceWithTax: 0,
    totalProductPriceWithoutTax: 0,
    numOfStoreProducts: 0,
  };

  constructor(public locationService: LocationService) { }


  navigateToCartHandler(): void {
    this.locationService.navigateTo4_1();
  }

}
