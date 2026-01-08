import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    const nextState = localStorageSync({
      keys: ['freezer', 'food', 'artikels'],
      rehydrate: true
    })(reducer)(state, action);

    return nextState;
  };
}
