import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtikelState } from './aktionhaus.reducer';

export const selectArtikelState =
  createFeatureSelector<ArtikelState>('artikels');

export const selectAllArtikels = createSelector(
  selectArtikelState,
  state => state.artikels
);
