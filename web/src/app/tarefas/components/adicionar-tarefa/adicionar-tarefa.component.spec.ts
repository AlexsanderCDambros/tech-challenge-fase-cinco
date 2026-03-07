import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdicionarTarefaComponent } from './adicionar-tarefa.component';
import { TarefasService } from '../../services/tarefas.service';
import { vi } from 'vitest';

describe('AdicionarTarefaComponent', () => {
  let tarefasService: any;

  beforeEach(async () => {
    tarefasService = { adicionarTarefa: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AdicionarTarefaComponent, ReactiveFormsModule],
      providers: [{ provide: TarefasService, useValue: tarefasService }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdicionarTarefaComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add task and reset form when submitting', () => {
    const fixture = TestBed.createComponent(AdicionarTarefaComponent);
    const component = fixture.componentInstance;

    component.form.setValue({ titulo: 'Nova', descricao: 'Descrição' });

    component.adicionarTarefa();

    expect(tarefasService.adicionarTarefa).toHaveBeenCalled();
    expect(component.form.value.titulo).toBeNull();
    expect(component.form.value.descricao).toBeNull();
  });
});
