import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PriceService } from '../price.service';
import { MOCK_DATA } from './price.service.mock-data';

describe('ApiService', () => {
  let service: PriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

    expect(value).toEqual('90%off');
  });
});
