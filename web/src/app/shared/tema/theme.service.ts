// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly STORAGE_KEY = 'user-theme';
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: 'light' | 'dark') {
    // Altera o color-scheme no elemento body
    this.renderer.setAttribute(document.body, 'style', `color-scheme: ${theme};`);
    this.currentTheme = theme;

    // Salva no localStorage
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Opcional: dispara um evento para componentes que precisam saber da mudança
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  initTheme() {
    // Primeiro tenta recuperar do localStorage
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark';

    if (savedTheme) {
      // Usa o tema salvo
      this.setTheme(savedTheme);
    } else {
      // Se não houver tema salvo, detecta preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      this.setTheme(systemTheme);

      // Opcional: salva a preferência do sistema como padrão
      // localStorage.setItem(this.STORAGE_KEY, systemTheme);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  resetToSystemPreference() {
    // Remove a preferência salva
    localStorage.removeItem(this.STORAGE_KEY);

    // Aplica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }
}
