import { TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toogle.component';
import { ThemeService } from './theme.service';

function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

describe('ThemeToggleComponent', () => {
  beforeAll(() => {
    if (!window.matchMedia) {
      mockMatchMedia();
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [ThemeService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
