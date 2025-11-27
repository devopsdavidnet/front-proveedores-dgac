import { TestBed } from '@angular/core/testing';

import { CompartirServiceService } from './compartir-service.service';

describe('CompartirServiceService', () => {
  let service: CompartirServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompartirServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
