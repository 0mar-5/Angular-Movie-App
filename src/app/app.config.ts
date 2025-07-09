import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import MyCustomColors from './MyCustomColors';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: MyCustomColors,
        options: {
          darkModeSelector: '.dark',
          cssLayer: false,
          darkMode: {
            selector: 'class',
            class: 'dark',
            prefersColorScheme: true,
          },
        },
      },
    }),
  ],
};
