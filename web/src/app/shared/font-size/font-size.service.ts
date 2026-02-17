// font-size.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FontSizeService {
  private renderer: Renderer2;
  private readonly STORAGE_KEY = 'user-font-size';
  private readonly DEFAULT_SIZE = 16; // tamanho base padrão em pixels
  private readonly MIN_SIZE = 12;
  private readonly MAX_SIZE = 24;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setFontSize(size: number) {
    // Garantir que o tamanho está dentro dos limites
    const clampedSize = Math.min(Math.max(size, this.MIN_SIZE), this.MAX_SIZE);

    // Aplica o tamanho base no elemento html
    this.renderer.setStyle(document.documentElement, 'font-size', `${clampedSize}px`);

    // Salva a preferência
    localStorage.setItem(this.STORAGE_KEY, clampedSize.toString());
  }

  getFontSize(): number {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return parseInt(saved, 10);
    }

    // Detecta o tamanho atual do navegador ou usa o padrão
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return isNaN(currentSize) ? this.DEFAULT_SIZE : currentSize;
  }

  getMinSize(): number {
    return this.MIN_SIZE;
  }

  getMaxSize(): number {
    return this.MAX_SIZE;
  }

  resetToDefault() {
    this.setFontSize(this.DEFAULT_SIZE);
  }

  initFontSize() {
    const savedSize = localStorage.getItem(this.STORAGE_KEY);
    if (savedSize) {
      this.setFontSize(parseInt(savedSize, 10));
    }
    // Se não houver tamanho salvo, não faz nada (usa o padrão do navegador)
  }
}
