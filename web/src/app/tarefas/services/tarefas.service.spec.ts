import { TestBed } from '@angular/core/testing';
import { TarefasService } from './tarefas.service';

describe('TarefasService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('should create', () => {
    const service = TestBed.inject(TarefasService);
    expect(service).toBeTruthy();
  });
});
