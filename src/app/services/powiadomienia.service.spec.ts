import {inject, TestBed} from '@angular/core/testing';

import {PowiadomieniaService} from './powiadomienia.service';

describe('PowiadomieniaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowiadomieniaService]
    });
  });

  it('should be created', inject([PowiadomieniaService], (service: PowiadomieniaService) => {
    expect(service).toBeTruthy();
  }));
});
