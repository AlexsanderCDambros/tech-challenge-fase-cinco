// font-size-slider.component.ts
import { Component, OnInit } from '@angular/core';
import { FontSizeService } from './font-size.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-font-size-slider',
  template: `
    <div class="font-size-control">
      <span class="label">
        <mat-icon>text_fields</mat-icon>
        Tamanho da Fonte
      </span>

      <div class="slider-container">
        <mat-icon class="size-icon" [class.active]="currentSize <= minSize">format_size</mat-icon>

        <mat-slider
          [min]="minSize"
          [max]="maxSize"
          [step]="1"
          discrete
          [displayWith]="formatLabel"
          class="font-slider">
          <input
            matSliderThumb
            [(value)]="currentSize"
            (valueChange)="onFontSizeChange($event)">
        </mat-slider>

        <mat-icon class="size-icon" [class.active]="currentSize >= maxSize">format_size</mat-icon>
      </div>

      <div class="size-display">
        <span>{{ currentSize }}px</span>
        <button
          mat-icon-button
          matTooltip="Restaurar tamanho padrão"
          (click)="resetToDefault()">
          <mat-icon>restart_alt</mat-icon>
        </button>
      </div>
    </div>
  `,
  imports: [
    MatIconModule,
    MatSliderModule,
    MatButtonModule
  ],
  providers: [FontSizeService],
  styles: [`
    .font-size-control {
      width: 200px;
    }

    .label {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      color: var(--mat-sys-on-surface-variant);
    }

    .slider-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .font-slider {
      flex: 1;
    }

    .size-icon {
      color: var(--mat-sys-on-surface-variant);
      opacity: 0.7;
      transition: all 0.2s ease;

      &.active {
        color: var(--mat-sys-primary);
        opacity: 1;
        transform: scale(1.1);
      }

      &:first-child {
        font-size: 18px;
      }

      &:last-child {
        font-size: 26px;
      }
    }

    .size-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background-color: var(--mat-sys-surface-container);
      border-radius: 20px;
      font-size: 14px;

      span {
        font-weight: 500;
        color: var(--mat-sys-primary);
      }
    }
  `]
})
export class FontSizeSliderComponent implements OnInit {
  currentSize: number;
  minSize: number;
  maxSize: number;

  constructor(private fontSizeService: FontSizeService) {
    this.minSize = fontSizeService.getMinSize();
    this.maxSize = fontSizeService.getMaxSize();
    this.currentSize = fontSizeService.getFontSize();
  }

  ngOnInit() {
    this.fontSizeService.initFontSize();
  }

  onFontSizeChange(size: number) {
    this.currentSize = size;
    this.fontSizeService.setFontSize(size);
  }

  resetToDefault() {
    this.fontSizeService.resetToDefault();
    this.currentSize = this.fontSizeService.getFontSize();
  }

  formatLabel(value: number): string {
    return value + 'px';
  }
}
