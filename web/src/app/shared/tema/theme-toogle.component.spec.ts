import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toogle.component';
import { ThemeService } from './theme.service';
import { vi } from 'vitest';

let mockMediaQuery: any;

function mockMatchMedia(matches = false) {
  let listener: ((event: MediaQueryListEvent) => void) | null = null;

  mockMediaQuery = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
      listener = cb;
    },
    removeEventListener: () => {
      listener = null;
    },
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    trigger: (event: MediaQueryListEvent) => {
      if (listener) {
        listener(event);
      }
    }
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => mockMediaQuery,
  });

  return mockMediaQuery;
}

describe('ThemeToggleComponent', () => {
  let themeService: any;

  beforeAll(() => {
    if (!window.matchMedia) {
      mockMatchMedia();
    }
  });

  beforeEach(async () => {
    themeService = {
      setTheme: vi.fn(),
      resetToSystemPreference: vi.fn(),
      getCurrentTheme: vi.fn(() => 'light')
    };

    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [{ provide: ThemeService, useValue: themeService }]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should update theme when setTheme is called', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    component.setTheme('dark');

    expect(themeService.setTheme).toHaveBeenCalledWith('dark');
    expect(component.isDark).toBe(true);

    component.setTheme('light');
    expect(themeService.setTheme).toHaveBeenCalledWith('light');
    expect(component.isDark).toBe(false);
  });

  it('should reset to system theme', () => {
    themeService.getCurrentTheme.mockReturnValue('dark');

    const fixture = TestBed.createComponent(ThemeToggleComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    component.resetToSystem();

    expect(themeService.resetToSystemPreference).toHaveBeenCalled();
    expect(component.isDark).toBe(true);
  });

  it('should listen to system theme changes when no user theme is set', () => {
    localStorage.removeItem('user-theme');

    mockMatchMedia(false);
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();

    const mediaQuery = (window.matchMedia('(prefers-color-scheme: dark)') as any);
    mediaQuery.trigger({ matches: true, media: '(prefers-color-scheme: dark)' } as any);

    expect(themeService.setTheme).toHaveBeenCalledWith('dark');
  });

  it('should remove listener on destroy', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();

    const mediaQuery = (window.matchMedia('(prefers-color-scheme: dark)') as any);
    const removeSpy = vi.spyOn(mediaQuery, 'removeEventListener');

    fixture.componentInstance.ngOnDestroy();

    expect(removeSpy).toHaveBeenCalled();
  });
});
