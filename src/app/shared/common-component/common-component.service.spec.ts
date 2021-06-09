import { TestBed } from '@angular/core/testing';

import { CommonComponentService } from './common-component.service';

describe('CommonComponentService', () => {
  let service: CommonComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
