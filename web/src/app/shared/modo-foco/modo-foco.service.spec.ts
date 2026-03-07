import { TestBed } from '@angular/core/testing';
import { ModoFocoService } from './modo-foco.service';

describe('ModoFocoService', () => {
  let service: ModoFocoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ModoFocoService] });
    service = TestBed.inject(ModoFocoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle focus mode', () => {
    const values: boolean[] = [];
    service.modoFocoAtivo$.subscribe((v) => values.push(v));

    expect(values[values.length - 1]).toBe(false);

    service.toggleModoFoco();
    expect(values[values.length - 1]).toBe(true);

    service.toggleModoFoco();
    expect(values[values.length - 1]).toBe(false);
  });
});
