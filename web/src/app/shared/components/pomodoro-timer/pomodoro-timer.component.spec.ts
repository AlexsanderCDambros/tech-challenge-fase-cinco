import { TestBed } from '@angular/core/testing';
import { PomodoroTimerComponent } from './pomodoro-timer.component';
import { vi } from 'vitest';

describe('PomodoroTimerComponent', () => {
  let playSpy: any;
  let audioUrls: string[];

  beforeEach(async () => {
    audioUrls = [];
    playSpy = vi.fn();

    class MockAudio {
      constructor(public url: string) {
        audioUrls.push(url);
      }

      play() {
        playSpy();
      }
    }

    vi.stubGlobal('Audio', MockAudio);
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [PomodoroTimerComponent]
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle start and pause', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();

    component.toggle();
    expect(component.isRunning()).toBe(true);
    expect(audioUrls).toContain('/assets/sounds/start.mp3');

    component.toggle();
    expect(component.isRunning()).toBe(false);
    expect(audioUrls).toContain('/assets/sounds/pause.mp3');
  });

  it('should decrement the timer and stop at zero', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    const component = fixture.componentInstance;

    component.timer.set(2);
    component.isRunning.set(true);

    component.start();

    vi.advanceTimersByTime(1000);
    expect(component.timer()).toBe(1);

    vi.advanceTimersByTime(1000);
    vi.runOnlyPendingTimers();

    expect(component.timer()).toBe(0);
    expect(component.isRunning()).toBe(false);
    expect(audioUrls).toContain('/assets/sounds/finished.mp3');
  });

  it('should reset timer and stop', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    const component = fixture.componentInstance;

    component.timer.set(10);
    component.isRunning.set(true);
    component.intervalId = setInterval(() => {}, 1000);

    component.reset();

    expect(component.timer()).toBe(25 * 60);
    expect(component.isRunning()).toBe(false);
    expect(audioUrls).toContain('/assets/sounds/reset.mp3');
  });

  it('should format time correctly', () => {
    const fixture = TestBed.createComponent(PomodoroTimerComponent);
    const component = fixture.componentInstance;

    expect(component.formatTime(0)).toBe('00:00');
    expect(component.formatTime(65)).toBe('01:05');
    expect(component.formatTime(600)).toBe('10:00');
  });
});
