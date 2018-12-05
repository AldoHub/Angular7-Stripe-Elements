import { TestBed } from '@angular/core/testing';

import { FetchProductsService } from './fetch-products.service';

describe('FetchProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchProductsService = TestBed.get(FetchProductsService);
    expect(service).toBeTruthy();
  });
});
