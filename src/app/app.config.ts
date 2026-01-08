import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { foodReducer, freezerReducer } from './FreezerManagement/freezer.reducer';
import { localStorageSyncReducer } from './localstorage.metareducer';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { artikelReducer } from './aktion-haus/reducers/aktionhaus.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(
      { freezer: freezerReducer, food: foodReducer, artikels: artikelReducer },
      {metaReducers: [localStorageSyncReducer]}),
      
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
    provideHttpClient()
]
};
