import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tarefas/tarefas-module').then(m => m.TarefasModule)
  }
];
