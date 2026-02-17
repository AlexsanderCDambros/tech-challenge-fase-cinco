import { Component, computed, input } from '@angular/core';
import { ITarefa } from '../../interfaces/tarefa';
import { MatCardModule } from '@angular/material/card';
import { TarefaComponent } from '../tarefa/tarefa.component';

@Component({
  selector: 'app-coluna-status',
  imports: [
    MatCardModule,
    TarefaComponent
  ],
  templateUrl: './coluna-status.component.html',
  styleUrl: './coluna-status.component.scss',
})
export class ColunaStatusComponent {
  tarefas = input.required<ITarefa[]>();
  status = input.required<'A fazer' | 'Em andamento' | 'Finalizada'>();

  tarefasFiltradas = computed(() => this.tarefas().filter(tarefa => tarefa.status === this.status()));
}
