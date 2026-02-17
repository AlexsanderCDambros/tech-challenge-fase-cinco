import { Component } from '@angular/core';
import { AdicionarTarefaComponent } from '../../components/adicionar-tarefa/adicionar-tarefa.component';
import { ModoFocoService } from '../../../shared/modo-foco/modo-foco.service';
import { CommonModule } from '@angular/common';
import { TarefasService } from '../../services/tarefas.service';
import { ColunaStatusComponent } from '../../components/coluna-status/coluna-status.component';
import { PomodoroTimerComponent } from '../../../shared/components/pomodoro-timer/pomodoro-timer.component';

@Component({
  selector: 'app-tarefas.component',
  imports: [
    CommonModule,
    AdicionarTarefaComponent,
    ColunaStatusComponent,
    PomodoroTimerComponent
  ],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.scss',
})
export class TarefasComponent {

  constructor(
    public modoFocoService: ModoFocoService,
    public tarefasService: TarefasService
  ) { }

}
