import { TestBed } from '@angular/core/testing';
import { FontSizeSliderComponent } from './font-size-slider.component';
import { FontSizeService } from './font-size.service';
import { vi } from 'vitest';

describe('FontSizeSliderComponent', () => {
  let fontSizeService: any;

  beforeEach(async () => {
    fontSizeService = {
      getMinSize: vi.fn(() => 12),
      getMaxSize: vi.fn(() => 24),
      getFontSize: vi.fn(() => 16),
      initFontSize: vi.fn(),
      setFontSize: vi.fn(),
      resetToDefault: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [FontSizeSliderComponent]
    })
      .overrideProvider(FontSizeService, { useValue: fontSizeService })
      .compileComponents();
  });

  it('should create and initialize sizes', () => {
    const fixture = TestBed.createComponent(FontSizeSliderComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component.currentSize).toBe(16);
    expect(component.minSize).toBe(12);
    expect(component.maxSize).toBe(24);
    expect(fontSizeService.initFontSize).toHaveBeenCalled();
  });

  it('should update font size when slider changes', () => {
    const fixture = TestBed.createComponent(FontSizeSliderComponent);
    const component = fixture.componentInstance;

    component.onFontSizeChange(20);

    expect(component.currentSize).toBe(20);
    expect(fontSizeService.setFontSize).toHaveBeenCalledWith(20);
  });

  it('should reset to default size', () => {
    fontSizeService.getFontSize.mockReturnValue(18);
    const fixture = TestBed.createComponent(FontSizeSliderComponent);
    const component = fixture.componentInstance;

    component.resetToDefault();

    expect(fontSizeService.resetToDefault).toHaveBeenCalled();
    expect(component.currentSize).toBe(18);
  });

  it('should format label correctly', () => {
    const fixture = TestBed.createComponent(FontSizeSliderComponent);
    const component = fixture.componentInstance;

    expect(component.formatLabel(15)).toBe('15px');
  });
});
