import {inject, TestBed} from '@angular/core/testing';

import {UzytkownikService} from './uzytkownik.service';

describe('UzytkownikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UzytkownikService]
    });
  });

  it('should be created', inject([UzytkownikService], (service: UzytkownikService) => {
    expect(service).toBeTruthy();
  }));
});
