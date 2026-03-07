import { TestBed } from '@angular/core/testing';
import { ModoFocoService } from './modo-foco.service';

describe('ModoFocoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModoFocoService]
    });
  });

  it('should create', () => {
    const service = TestBed.inject(ModoFocoService);
    expect(service).toBeTruthy();
  });
});
