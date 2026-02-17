import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ITarefa } from '../../interfaces/tarefa';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ModoFocoService } from '../../../shared/modo-foco/modo-foco.service';
import { TarefasService } from '../../services/tarefas.service';

@Component({
  selector: 'app-tarefa',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss',
})
export class TarefaComponent {
  tarefa = input.required<ITarefa>();

  tarefasService = inject(TarefasService);
  focoService = inject(ModoFocoService);
}
