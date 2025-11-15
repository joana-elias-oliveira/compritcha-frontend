import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      FontAwesomeModule,
      HttpClientModule
    )
  ]
};
