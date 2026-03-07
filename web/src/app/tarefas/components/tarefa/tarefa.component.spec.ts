import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TarefaComponent } from './tarefa.component';
import { TarefasService } from '../../services/tarefas.service';
import { ModoFocoService } from '../../../shared/modo-foco/modo-foco.service';

describe('TarefaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaComponent],
      providers: [TarefasService, ModoFocoService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TarefaComponent);
    const component = fixture.componentInstance;

    // Required input (Angular signal) must be initialized for the component template.
    // `input.required` creates an InputSignal; we provide a stub signal via `signal()`.
    component.tarefa = signal({
      id: 1,
      titulo: 'Teste',
      descricao: 'Descrição de teste',
      dataCriacao: new Date(),
      status: 'A fazer'
    }) as any;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
