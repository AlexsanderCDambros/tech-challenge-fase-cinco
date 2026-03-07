import { TestBed } from '@angular/core/testing';
import { ModoFocoComponent } from './modo-foco-component';
import { ModoFocoService } from './modo-foco.service';

describe('ModoFocoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModoFocoComponent],
      providers: [ModoFocoService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ModoFocoComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
