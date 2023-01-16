import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor() { }

  calculateDiscountRate(standardPrice: number, storePrice?: number): string {
    if (!storePrice || !standardPrice) {
      return '';
    }
    if (storePrice > standardPrice){
      return '';
    }
    // Calculating a decimal point in JavaScript introduces an error, so multiply the decimal value by a number 10^N to make it an integer value(enough larger than expented discount rate) before calculating it.
    return Math.floor((1000 - (storePrice * 1000 / standardPrice)) / 10) + '%off';
  }

  calculateTaxedValue(price: number): number {
    if (!price ) return 0;
    return Math.floor((price * 1.08 * 100) / 100)
  }
}
