import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';
import { ThemeService } from './theme.service';
import { vi } from 'vitest';

describe('ThemeService', () => {
  let setAttributeSpy: ReturnType<typeof vi.fn>;
  let setStyleSpy: ReturnType<typeof vi.fn>;
  let dispatchEventSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();

    setAttributeSpy = vi.fn();
    setStyleSpy = vi.fn();

    const mockRenderer: any = {
      setAttribute: setAttributeSpy,
      setStyle: setStyleSpy
    };

    const mockRendererFactory: any = {
      createRenderer: () => mockRenderer
    };

    dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: RendererFactory2, useValue: mockRendererFactory }
      ]
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set theme and persist it', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('dark');

    expect(setAttributeSpy).toHaveBeenCalledWith(document.body, 'style', 'color-scheme: dark;');
    expect(localStorage.getItem('user-theme')).toBe('dark');
    expect(service.getCurrentTheme()).toBe('dark');
    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('should initialize theme from localStorage when available', () => {
    localStorage.setItem('user-theme', 'light');
    const service = TestBed.inject(ThemeService);

    service.initTheme();

    expect(service.getCurrentTheme()).toBe('light');
    expect(setAttributeSpy).toHaveBeenCalledWith(document.body, 'style', 'color-scheme: light;');
  });

  it('should initialize theme from system preference when no localStorage value', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} })
    });

    const service = TestBed.inject(ThemeService);

    service.initTheme();

    expect(service.getCurrentTheme()).toBe('dark');
    expect(setAttributeSpy).toHaveBeenCalledWith(document.body, 'style', 'color-scheme: dark;');
  });

  it('should toggle theme', () => {
    const service = TestBed.inject(ThemeService);

    service.setTheme('light');
    service.toggleTheme();

    expect(service.getCurrentTheme()).toBe('dark');

    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should reset to system preference', () => {
    localStorage.setItem('user-theme', 'light');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })
    });

    const service = TestBed.inject(ThemeService);

    service.resetToSystemPreference();

    expect(localStorage.getItem('user-theme')).toBe('light');
    expect(service.getCurrentTheme()).toBe('light');
  });
});
