import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ColunaStatusComponent } from './coluna-status.component';

describe('ColunaStatusComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColunaStatusComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ColunaStatusComponent);
    const component = fixture.componentInstance;

    // Required inputs (Angular signals) must be initialized for the component to render.
    // `input.required` creates an InputSignal; we provide a stub signal via `signal()`.
    component.status = signal<'A fazer' | 'Em andamento' | 'Finalizada'>('A fazer') as any;
    component.tarefas = signal([]) as any;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
