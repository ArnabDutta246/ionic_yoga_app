import { TestBed } from '@angular/core/testing';

import { YogasService } from './yogas.service';

describe('YogasService', () => {
  let service: YogasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YogasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
