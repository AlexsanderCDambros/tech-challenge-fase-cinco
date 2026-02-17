import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/tema/theme.service';
import { ThemeToggleComponent } from './shared/tema/theme-toogle.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontSizeSliderComponent } from './shared/font-size/font-size-slider.component';
import { ModoFocoComponent } from './shared/modo-foco/modo-foco-component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ThemeToggleComponent,
    MatToolbarModule,
    FontSizeSliderComponent,
    ModoFocoComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('mindease');

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}

