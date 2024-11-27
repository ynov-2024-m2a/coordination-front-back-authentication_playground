import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(MatTabsModule),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-lunjvodt8mucdne4.us.auth0.com',
      clientId: '5CiAMJYZVsWuDEREFCCEOZYss0wgXzta',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
};
