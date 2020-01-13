import { TestBed } from '@angular/core/testing';

import { NavegacaoService } from './navegacao.service';

describe('NavegacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavegacaoService = TestBed.get(NavegacaoService);
    expect(service).toBeTruthy();
  });
});
