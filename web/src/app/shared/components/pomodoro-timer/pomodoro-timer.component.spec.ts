import { TestBed } from '@angular/core/testing';
import { PomodoroTimerComponent } from './pomodoro-timer.component';

describe('PomodoroTimerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PomodoroTimerComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
