import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { firebaseProviders } from './firebase.config';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    ...firebaseProviders,
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
  ]
};
