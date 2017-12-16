import {inject, TestBed} from '@angular/core/testing';

import {UwagaService} from './uwaga.service';

describe('UwagaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UwagaService]
    });
  });

  it('should be created', inject([UwagaService], (service: UwagaService) => {
    expect(service).toBeTruthy();
  }));
});
