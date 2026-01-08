import { createReducer, on } from '@ngrx/store';
import { Artikel, Detail, Photo } from './aktionhaus.models';
import { v4 as uuid } from 'uuid';
import { addArtikel, deleteArtikel } from './aktionhaus.actions';

export interface ArtikelState {
  artikels: Artikel[];
}

export const initialStateForArtikel: ArtikelState = {
  artikels: []
};

export const artikelReducer = createReducer(
    initialStateForArtikel,
    on(addArtikel, (state, {detail, photo, duration, firstPrice}) => ({
        ...state,
        artikels: [
            ...state.artikels,
            {
            id: uuid(),
            detail,
            photo,
            duration,
            firstPrice
            }
        ]
    })),
    on(deleteArtikel, (state, {id}) => ({
        ...state,
        artikels: state.artikels.filter(
          artikel => artikel.id !== id
        )
    }))
)