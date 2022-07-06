import { TestBed } from '@angular/core/testing';

import { BPCServiceService } from './bpcservice.service';

describe('BPCServiceService', () => {
  let service: BPCServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BPCServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
