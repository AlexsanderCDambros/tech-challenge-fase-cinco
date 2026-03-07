import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ColunaStatusComponent } from './coluna-status.component';
import { ITarefa } from '../../interfaces/tarefa';

describe('ColunaStatusComponent', () => {
  const tarefas: ITarefa[] = [
    { id: 1, titulo: 'A', descricao: '...', dataCriacao: new Date(), status: 'A fazer' },
    { id: 2, titulo: 'B', descricao: '...', dataCriacao: new Date(), status: 'Finalizada' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColunaStatusComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ColunaStatusComponent);
    const component = fixture.componentInstance;

    component.status = signal<'A fazer' | 'Em andamento' | 'Finalizada'>('A fazer') as any;
    component.tarefas = signal([]) as any;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should filter tarefas by status', () => {
    const fixture = TestBed.createComponent(ColunaStatusComponent);
    const component = fixture.componentInstance;

    component.tarefas = signal(tarefas) as any;
    component.status = signal('A fazer') as any;
    fixture.detectChanges();

    expect(fixture.componentInstance.tarefasFiltradas()).toEqual([
      expect.objectContaining({ id: 1 })
    ]);
  });
});
