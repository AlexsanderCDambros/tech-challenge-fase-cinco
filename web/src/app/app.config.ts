import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ThemeService } from './shared/tema/theme.service';

export function initThemeFactory(themeService: ThemeService) {
  return () => themeService.initTheme();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: APP_INITIALIZER, useFactory: initThemeFactory, deps: [ThemeService], multi: true }
  ]
};
