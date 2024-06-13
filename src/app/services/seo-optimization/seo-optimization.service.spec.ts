import { TestBed } from '@angular/core/testing';

import { SeoOptimizationService } from './seo-optimization.service';

describe('SeoOptimizationService', () => {
  let service: SeoOptimizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoOptimizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
