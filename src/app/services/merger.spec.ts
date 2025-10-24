import { TestBed } from '@angular/core/testing';

import { Merger } from './merger';

describe('Merger', () => {
  let service: Merger;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Merger);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
