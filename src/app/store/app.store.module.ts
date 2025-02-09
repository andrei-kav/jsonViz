import {provideStore, StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducers';
import {environment} from '../../environments/environment';
import {provideStoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {isDevMode} from '@angular/core';

export const AppStoreModule = [
  // StoreModule.forRoot(appReducers),
  // !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : []
  // provideStore(appReducers),
  // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
