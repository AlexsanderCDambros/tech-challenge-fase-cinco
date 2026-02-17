import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefasService } from '../../services/tarefas.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-tarefa',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './adicionar-tarefa.component.html',
  styleUrl: './adicionar-tarefa.component.scss',
})
export class AdicionarTarefaComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tarefasService: TarefasService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  public adicionarTarefa() {
    this.tarefasService.adicionarTarefa({
      id: 0,
      titulo: this.form.value.titulo,
      descricao: this.form.value.descricao,
      dataCriacao: new Date(),
      status: 'A fazer'
    });
    this.form.reset();
  }
}
