import {inject, TestBed} from '@angular/core/testing';

import {OfertaService} from './oferta.service';

describe('OfertaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfertaService]
    });
  });

  it('should be created', inject([OfertaService], (service: OfertaService) => {
    expect(service).toBeTruthy();
  }));
});
