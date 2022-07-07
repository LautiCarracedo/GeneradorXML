import { TestBed } from '@angular/core/testing';

import { EntesVariosService } from './entes-varios.service';

describe('EntesVariosService', () => {
  let service: EntesVariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntesVariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
