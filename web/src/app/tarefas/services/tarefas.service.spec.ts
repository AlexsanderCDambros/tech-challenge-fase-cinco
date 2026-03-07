import { TestBed } from '@angular/core/testing';
import { TarefasService } from './tarefas.service';
import { ITarefa } from '../interfaces/tarefa';
import { vi } from 'vitest';

describe('TarefasService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [TarefasService] });
  });

  it('should create', () => {
    const service = TestBed.inject(TarefasService);
    expect(service).toBeTruthy();
  });

  it('should load tarefas from localStorage on construction', () => {
    const saved: ITarefa[] = [
      { id: 1, titulo: 'Teste', descricao: 'Desc', dataCriacao: new Date(), status: 'A fazer' }
    ];
    localStorage.setItem('tarefas', JSON.stringify(saved));

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [TarefasService] });
    const service = TestBed.inject(TarefasService);

    expect(service.tarefas.getValue()[0]).toEqual(
      expect.objectContaining({
        id: 1,
        titulo: 'Teste',
        descricao: 'Desc',
        status: 'A fazer'
      })
    );
  });

  it('should add a tarefa and persist it', () => {
    const service = TestBed.inject(TarefasService);

    const tarefa: ITarefa = {
      id: 0,
      titulo: 'Nova',
      descricao: 'Descrição',
      dataCriacao: new Date(),
      status: 'A fazer'
    };

    service.adicionarTarefa(tarefa);

    const stored = JSON.parse(localStorage.getItem('tarefas') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].titulo).toBe('Nova');
    expect(service.tarefas.getValue()[0].id).toBe(1);
  });

  it('should update status of an existing tarefa', () => {
    const service = TestBed.inject(TarefasService);
    const tarefa: ITarefa = {
      id: 0,
      titulo: 'Teste',
      descricao: 'Desc',
      dataCriacao: new Date(),
      status: 'A fazer'
    };
    service.adicionarTarefa(tarefa);

    service.alterarStatusTarefa(1, 'Finalizada');
    expect(service.tarefas.getValue()[0].status).toBe('Finalizada');
  });

  it('should not change status if tarefa not found', () => {
    const service = TestBed.inject(TarefasService);
    service.alterarStatusTarefa(999, 'Finalizada');
    expect(service.tarefas.getValue().length).toBe(0);
  });

  it('should remove tarefa when confirmed', () => {
    const service = TestBed.inject(TarefasService);
    const tarefa: ITarefa = {
      id: 0,
      titulo: 'Teste',
      descricao: 'Desc',
      dataCriacao: new Date(),
      status: 'A fazer'
    };
    service.adicionarTarefa(tarefa);

    vi.spyOn(window, 'confirm').mockReturnValue(true);

    service.excluirTarefa(1);
    expect(service.tarefas.getValue().length).toBe(0);
  });

  it('should not remove tarefa when not confirmed', () => {
    const service = TestBed.inject(TarefasService);
    const tarefa: ITarefa = {
      id: 0,
      titulo: 'Teste',
      descricao: 'Desc',
      dataCriacao: new Date(),
      status: 'A fazer'
    };
    service.adicionarTarefa(tarefa);

    vi.spyOn(window, 'confirm').mockReturnValue(false);

    service.excluirTarefa(1);
    expect(service.tarefas.getValue().length).toBe(1);
  });
});
