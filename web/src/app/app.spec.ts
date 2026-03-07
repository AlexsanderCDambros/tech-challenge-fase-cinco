import { TestBed } from '@angular/core/testing';
import { App } from './app';

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
  beforeAll(() => {
    ensureMatchMedia();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: []
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
