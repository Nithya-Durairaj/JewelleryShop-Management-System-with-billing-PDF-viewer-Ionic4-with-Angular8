import { TestBed } from '@angular/core/testing';

import { BillingServiceService } from './billing-service.service';

describe('BillingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillingServiceService = TestBed.get(BillingServiceService);
    expect(service).toBeTruthy();
  });
});
