import { TestBed } from '@angular/core/testing';
import { AdicionarTarefaComponent } from './adicionar-tarefa.component';
import { TarefasService } from '../../services/tarefas.service';

describe('AdicionarTarefaComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarTarefaComponent],
      providers: [TarefasService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AdicionarTarefaComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
