import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { signal } from '@angular/core';
import { TarefaComponent } from './tarefa.component';
import { TarefasService } from '../../services/tarefas.service';
import { ModoFocoService } from '../../../shared/modo-foco/modo-foco.service';
import { vi } from 'vitest';

describe('TarefaComponent', () => {
  let tarefasService: any;
  let focoService: any;
  let modoFocoSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    modoFocoSubject = new BehaviorSubject(false);
    focoService = { modoFocoAtivo$: modoFocoSubject.asObservable() };
    tarefasService = {
      alterarStatusTarefa: vi.fn(),
      excluirTarefa: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TarefaComponent],
      providers: [
        { provide: TarefasService, useValue: tarefasService },
        { provide: ModoFocoService, useValue: focoService }
      ]
    }).compileComponents();
  });

  function createComponent(status: 'A fazer' | 'Em andamento' | 'Finalizada') {
    const fixture = TestBed.createComponent(TarefaComponent);
    const component = fixture.componentInstance;

    component.tarefa = signal({
      id: 1,
      titulo: 'Teste',
      descricao: 'Descrição de teste',
      dataCriacao: new Date(),
      status
    }) as any;

    fixture.detectChanges();
    return { fixture, component };
  }

  it('should create', () => {
    const { component } = createComponent('A fazer');
    expect(component).toBeTruthy();
  });

  it('should show action buttons when focus mode is off', () => {
    const { fixture } = createComponent('A fazer');
    const buttons = fixture.nativeElement.querySelectorAll('button');

    const texts = Array.from(buttons).map((btn: any) => btn.textContent.trim());
    expect(texts).toContain('>');
    expect(texts).toContain('>>');
  });

  it('should not show action buttons when focus mode is on', () => {
    modoFocoSubject.next(true);
    const { fixture } = createComponent('A fazer');
    const actions = fixture.nativeElement.querySelector('mat-card-actions');
    expect(actions).toBeNull();
  });

  it('should show correct buttons for "Em andamento" and call service', () => {
    const { fixture } = createComponent('Em andamento');
    const buttons = fixture.nativeElement.querySelectorAll('button');

    const backButton = Array.from(buttons).find((b: any) => b.textContent.trim() === '<') as HTMLButtonElement;
    const forwardButton = Array.from(buttons).find((b: any) => b.textContent.trim() === '>') as HTMLButtonElement;

    expect(backButton).toBeTruthy();
    expect(forwardButton).toBeTruthy();

    backButton.click();
    forwardButton.click();

    expect(tarefasService.alterarStatusTarefa).toHaveBeenCalledTimes(2);
  });

  it('should show correct buttons for "Finalizada" and call service', () => {
    const { fixture } = createComponent('Finalizada');
    const buttons = fixture.nativeElement.querySelectorAll('button');

    const backButton = Array.from(buttons).find((b: any) => b.textContent.trim() === '<<') as HTMLButtonElement;
    const undoButton = Array.from(buttons).find((b: any) => b.textContent.trim() === '<') as HTMLButtonElement;

    expect(backButton).toBeTruthy();
    expect(undoButton).toBeTruthy();

    backButton.click();
    undoButton.click();

    expect(tarefasService.alterarStatusTarefa).toHaveBeenCalledTimes(2);
  });

  it('should call excluirTarefa when delete button clicked', () => {
    const { fixture } = createComponent('A fazer');

    const deleteButton = Array.from(fixture.nativeElement.querySelectorAll('button')).find(
      (b: any) => b.textContent.trim() === 'Excluir'
    ) as HTMLButtonElement;

    expect(deleteButton).toBeTruthy();
    deleteButton.click();

    expect(tarefasService.excluirTarefa).toHaveBeenCalled();
  });
});
