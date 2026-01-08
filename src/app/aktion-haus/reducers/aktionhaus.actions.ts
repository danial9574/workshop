import { createAction, props } from '@ngrx/store';
import { Detail, Photo } from './aktionhaus.models';

export const addArtikel = createAction(
    '[Artikel] Add Artikel',
    props<{detail: Detail, duration: any, photo: Photo, firstPrice: number }>()
)

export const deleteArtikel = createAction(
    '[Artikel] Delete Artikel',
    props<{id: string }>()
)

