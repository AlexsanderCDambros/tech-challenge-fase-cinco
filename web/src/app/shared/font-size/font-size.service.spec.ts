import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';
import { FontSizeService } from './font-size.service';
import { vi } from 'vitest';

describe('FontSizeService', () => {
  let setStyleSpy: ReturnType<typeof vi.fn>;
  let getComputedStyleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();

    setStyleSpy = vi.fn();
    const mockFactory: any = { createRenderer: () => ({ setStyle: setStyleSpy }) };

    getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({ fontSize: '18px' } as any);

    TestBed.configureTestingModule({
      providers: [
        FontSizeService,
        { provide: RendererFactory2, useValue: mockFactory }
      ]
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    const service = TestBed.inject(FontSizeService);
    expect(service).toBeTruthy();
  });

  it('should clamp and persist font size', () => {
    const service = TestBed.inject(FontSizeService);
    service.setFontSize(100);

    expect(setStyleSpy).toHaveBeenCalledWith(document.documentElement, 'font-size', '24px');
    expect(localStorage.getItem('user-font-size')).toBe('24');
  });

  it('should read saved font size from localStorage', () => {
    localStorage.setItem('user-font-size', '20');
    const service = TestBed.inject(FontSizeService);

    expect(service.getFontSize()).toBe(20);
    expect(getComputedStyleSpy).not.toHaveBeenCalled();
  });

  it('should fall back to default size when computed font size is invalid', () => {
    getComputedStyleSpy.mockReturnValue({ fontSize: 'invalid' } as any);
    const service = TestBed.inject(FontSizeService);

    expect(service.getFontSize()).toBe(16);
  });

  it('should reset to default size', () => {
    const service = TestBed.inject(FontSizeService);
    service.resetToDefault();

    expect(setStyleSpy).toHaveBeenCalledWith(document.documentElement, 'font-size', '16px');
  });

  it('should initialize font size when stored', () => {
    localStorage.setItem('user-font-size', '18');
    const service = TestBed.inject(FontSizeService);
    const setFontSizeSpy = vi.spyOn(service, 'setFontSize');

    service.initFontSize();

    expect(setFontSizeSpy).toHaveBeenCalledWith(18);
  });
});
