import { TestBed } from '@angular/core/testing';

import { MetricsserviceService } from './metricsservice.service';

describe('MetricsserviceService', () => {
  let service: MetricsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
