import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationGaurdService } from './authentication-gaurd.service';

describe('AuthenticationGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationGaurdService]
    });
  });

  it('should be created', inject([AuthenticationGaurdService], (service: AuthenticationGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
