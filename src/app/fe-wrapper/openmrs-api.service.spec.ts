import { TestBed } from '@angular/core/testing';

import { OpenmrsApiService } from './openmrs-api.service';

describe('OpenmrsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenmrsApiService = TestBed.get(OpenmrsApiService);
    expect(service).toBeTruthy();
  });
});
