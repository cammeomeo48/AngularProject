import { TestBed } from '@angular/core/testing';

import { Ex18Service } from '../ex18/ex18-service';

describe('Ex18Service', () => {
  let service: Ex18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex18Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
