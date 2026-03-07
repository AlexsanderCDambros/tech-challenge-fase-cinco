import { TestBed } from '@angular/core/testing';
import { TarefasComponent } from './tarefas.component';

describe('TarefasComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefasComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TarefasComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
