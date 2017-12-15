import {inject, TestBed} from '@angular/core/testing';

import {AutentykacjaService} from './autentykacja.service';

describe('AutentykacjaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutentykacjaService]
    });
  });

  it('should be created', inject([AutentykacjaService], (service: AutentykacjaService) => {
    expect(service).toBeTruthy();
  }));
});
