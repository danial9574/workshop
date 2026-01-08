import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodState, FreezerState } from './freezer.reducer';

export const selectFreezerState =
  createFeatureSelector<FreezerState>('freezer');

export const selectAllFreezers = createSelector(
  selectFreezerState,
  state => state.freezers
);

export const selectFoodState =
  createFeatureSelector<FoodState>('food');

export const selectAllFoods = createSelector(
  selectFoodState,
  state => state.foods
);

