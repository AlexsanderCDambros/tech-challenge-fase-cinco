import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pomodoro-timer',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pomodoro-timer.component.html',
  styleUrl: './pomodoro-timer.component.scss',
})
export class PomodoroTimerComponent {
  timer = signal(25 * 60);
  isRunning = signal(false);
  intervalId: any;

  private playSound(soundName: string) {
    const audio = new Audio(`/assets/sounds/${soundName}.mp3`);
    audio.play();
  }

  toggle() {
    this.isRunning.update((r) => !r);
    if (this.isRunning()) {
      this.start();
    } else {
      this.pause();
    }
  }

  start() {
    this.playSound('start');
    this.intervalId = setInterval(() => {
      this.timer.update((t) => {
        if (t > 0) {
          return t - 1;
        } else {
          this.playSound('finished');
          this.pause();
          this.isRunning.set(false);
          return 0;
        }
      });
    }, 1000);
  }

  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.playSound('pause');
    }
  }

  reset() {
    this.pause();
    this.timer.set(25 * 60);
    this.isRunning.set(false);
    this.playSound('reset');
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
