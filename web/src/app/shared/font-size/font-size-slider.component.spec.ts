import { TestBed } from '@angular/core/testing';
import { FontSizeSliderComponent } from './font-size-slider.component';
import { FontSizeService } from './font-size.service';

describe('FontSizeSliderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontSizeSliderComponent],
      providers: [FontSizeService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FontSizeSliderComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
