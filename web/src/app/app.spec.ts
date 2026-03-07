import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ThemeService } from './shared/tema/theme.service';
import { vi } from 'vitest';

function ensureMatchMedia() {
  // jsdom provides matchMedia but its MediaQueryList uses the modern
  // addEventListener/removeEventListener API only. Angular CDK still uses
  // the legacy addListener/removeListener methods in some versions.
  const originalMatchMedia = window.matchMedia;

  (window as any).matchMedia = (query: string) => {
    const mql = originalMatchMedia ? originalMatchMedia.call(window, query) : {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    };

    if (!(mql as any).addListener) {
      (mql as any).addListener = (mql as any).addEventListener?.bind(mql) ?? (() => {});
    }

    if (!(mql as any).removeListener) {
      (mql as any).removeListener = (mql as any).removeEventListener?.bind(mql) ?? (() => {});
    }

    return mql;
  };
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
