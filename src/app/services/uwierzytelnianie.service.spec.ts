import {inject, TestBed} from '@angular/core/testing';

import {UwierzytelnianieService} from './uwierzytelnianie.service';

describe('UwierzytelnianieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UwierzytelnianieService]
    });
  });

  it('should be created', inject([UwierzytelnianieService], (service: UwierzytelnianieService) => {
    expect(service).toBeTruthy();
  }));
});
