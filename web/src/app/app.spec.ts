import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ThemeService } from './shared/tema/theme.service';
import { vi } from 'vitest';

function ensureMatchMedia() {
  if (!window.matchMedia) {
    (window as any).matchMedia = () => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    });
  }
}

describe('App', () => {
  let initSpy: ReturnType<typeof vi.fn>;
  let getCurrentThemeSpy: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    ensureMatchMedia();
  });

  beforeEach(async () => {
    initSpy = vi.fn();
    getCurrentThemeSpy = vi.fn(() => 'light');

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            initTheme: initSpy,
            getCurrentTheme: getCurrentThemeSpy,
            resetToSystemPreference: vi.fn(),
            setTheme: vi.fn()
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app and initialize theme', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect(initSpy).toHaveBeenCalled();
  });
});
