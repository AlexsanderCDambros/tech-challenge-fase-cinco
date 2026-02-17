// theme-toggle.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      mat-icon-button
      [matMenuTriggerFor]="themeMenu"
      [matTooltip]="'Tema: ' + (isDark ? 'Escuro' : 'Claro')">
      <mat-icon>{{ isDark ? 'dark_mode' : 'light_mode' }}</mat-icon>
    </button>

    <mat-menu #themeMenu="matMenu">
      <div class="theme-menu-header">
        <mat-icon>palette</mat-icon>
        <span>Tema da Aplicação</span>
      </div>

      <mat-divider></mat-divider>

      <button mat-menu-item (click)="setTheme('light')">
        <mat-icon [class.active-theme]="!isDark">light_mode</mat-icon>
        <span>Claro</span>
        @if (!isDark) {
          <span class="theme-status" style="margin-left: 4px">✓</span>
        }
      </button>

      <button mat-menu-item (click)="setTheme('dark')">
        <mat-icon [class.active-theme]="isDark">dark_mode</mat-icon>
        <span>Escuro</span>
         @if (isDark) {
          <span class="theme-status" style="margin-left: 4px">✓</span>
        }
      </button>

      <mat-divider></mat-divider>

      <button mat-menu-item (click)="resetToSystem()">
        <mat-icon>settings_suggest</mat-icon>
        <span>Automático (seguir sistema)</span>
      </button>

      <div class="theme-preview" [class.dark-preview]="isDark">
        <div class="preview-colors">
          <div class="color primary"></div>
          <div class="color accent"></div>
          <div class="color surface"></div>
        </div>
      </div>
    </mat-menu>
  `,
  styles: [`
    .theme-menu-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
      font-weight: 500;
    }

    .active-theme {
      color: var(--mat-sys-primary) !important;
    }

    .theme-status {
      margin-left: auto;
      color: var(--mat-sys-primary);
      font-weight: bold;
    }

    .theme-preview {
      padding: 16px;
      background-color: var(--mat-sys-surface);
      border-top: 1px solid var(--mat-sys-outline-variant);

      &.dark-preview {
        background-color: #1e1e1e;
      }
    }

    .preview-colors {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .color {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid var(--mat-sys-surface-container-high);

      &.primary {
        background-color: var(--mat-sys-primary);
      }

      &.accent {
        background-color: var(--mat-sys-secondary);
      }

      &.surface {
        background-color: var(--mat-sys-surface-container-highest);
      }
    }
  `],
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDividerModule, MatMenuModule]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  isDark: boolean = false;
  private mediaQuery: MediaQueryList;
  private mediaQueryListener: (e: MediaQueryListEvent) => void;

  constructor(private themeService: ThemeService) {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      // Se não houver tema salvo, atualiza com a mudança do sistema
      if (!localStorage.getItem('user-theme')) {
        this.themeService.setTheme(e.matches ? 'dark' : 'light');
        this.isDark = e.matches;
      }
    };
  }

  ngOnInit() {
    this.isDark = this.themeService.getCurrentTheme() === 'dark';

    // Escuta mudanças na preferência do sistema
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
    this.isDark = theme === 'dark';
  }

  resetToSystem() {
    this.themeService.resetToSystemPreference();
    this.isDark = this.themeService.getCurrentTheme() === 'dark';
  }
}
