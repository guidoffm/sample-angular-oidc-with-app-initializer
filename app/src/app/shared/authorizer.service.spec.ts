import { TestBed } from '@angular/core/testing';

import { AuthorizerService } from './authorizer.service';

describe('AuthorizerService', () => {
  let service: AuthorizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
