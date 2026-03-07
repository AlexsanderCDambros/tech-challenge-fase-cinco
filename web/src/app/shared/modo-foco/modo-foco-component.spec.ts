import { TestBed } from '@angular/core/testing';
import { ModoFocoComponent } from './modo-foco-component';
import { ModoFocoService } from './modo-foco.service';
import { vi } from 'vitest';

describe('ModoFocoComponent', () => {
  let modoFocoService: any;

  beforeEach(async () => {
    modoFocoService = { toggleModoFoco: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ModoFocoComponent],
      providers: [{ provide: ModoFocoService, useValue: modoFocoService }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ModoFocoComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should call service to toggle focus mode', () => {
    const fixture = TestBed.createComponent(ModoFocoComponent);
    fixture.detectChanges();

    fixture.componentInstance.toggleModoFoco();

    expect(modoFocoService.toggleModoFoco).toHaveBeenCalled();
  });
});
