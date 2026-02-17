import { Injectable } from '@angular/core';
import { ITarefa } from '../interfaces/tarefa';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarefasService {
  tarefas: BehaviorSubject<ITarefa[]> = new BehaviorSubject<ITarefa[]>([]);
  lastId: number = 0;

  constructor() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      this.tarefas.next(JSON.parse(tarefasSalvas));
    }
  }

  get tarefas$() {
    return this.tarefas.asObservable();
  }

  adicionarTarefa(tarefa: ITarefa) {
    const tarefasAtuais = this.tarefas.getValue();
    const novasTarefas = [...tarefasAtuais, { ...tarefa, id: this.lastId + 1 }];
    this.lastId += 1;
    this.tarefas.next(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }

  alterarStatusTarefa(id: number, status: 'A fazer' | 'Em andamento' | 'Finalizada') {
    const tarefasAtuais = this.tarefas.getValue();
    const index = tarefasAtuais.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
      tarefasAtuais[index].status = status;
      this.tarefas.next([...tarefasAtuais]);
      localStorage.setItem('tarefas', JSON.stringify(tarefasAtuais));
    }
  }

  excluirTarefa(id: number) {
    if (!confirm('Deseja realmente excluir esta tarefa?')) {
      return;
    }
    const tarefasAtuais = this.tarefas.getValue();
    const novasTarefas = tarefasAtuais.filter(tarefa => tarefa.id !== id);
    this.tarefas.next(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  }
}
