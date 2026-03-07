import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  it('should create', () => {
    const service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });
});
