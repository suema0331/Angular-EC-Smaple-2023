// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PriceService } from '../price.service';
import { MOCK_DATA } from './price.service.mock-data';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      providers: [PriceService],
    });

    service = TestBed.inject(PriceService);
  });

  // A spy service is created.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate discount rate', () => {
    service = TestBed.inject(PriceService);

    const value = service.calculateDiscountRate(
      MOCK_DATA.products[0].standard_price,
      MOCK_DATA.products[0].store_price
    );
    const value2 = service.calculateDiscountRate(
      MOCK_DATA.products[1].standard_price,
      MOCK_DATA.products[1].store_price
    );
    expect(value).toEqual('90%off');
    expect(value2).toEqual('10%off');
  });

  it('should calculate taxed value', () => {
    service = TestBed.inject(PriceService);

    const value = service.calculateTaxedValue(
      MOCK_DATA.products[0].store_price
    );
    const value2 = service.calculateTaxedValue(
      MOCK_DATA.products[1].store_price
    );
    expect(value).toEqual(106);
    expect(value2).toEqual(97);
  });
});
