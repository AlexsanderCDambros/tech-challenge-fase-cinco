import { TestBed } from '@angular/core/testing';
import { FontSizeService } from './font-size.service';

describe('FontSizeService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [FontSizeService]
    });
  });

  it('should create', () => {
    const service = TestBed.inject(FontSizeService);
    expect(service).toBeTruthy();
  });
});
