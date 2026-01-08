import { createAction, props } from '@ngrx/store';
import { Freezer, Fach, Food } from './freezer.models';

export const addFreezer = createAction(
  '[Freezer] Add Freezer',
  props<{ name: string; faecherAnzahl: number }>()
);

export const addFach = createAction(
  '[Freezer] Add Fach',
  props<{ freezerId: string; fach: Fach }>()
);

export const addFood = createAction(
  '[Food] Add Food',
  props<{ 
    name: string;
    freezerId: string;
    fachNumber: number;
    bezeichnung: string;
    photo?: string | null;
    date: String | null;
  }>()
);

export const addFoodsPhoto = createAction(
  '[Food] Add Photo',
  props<{ 
    fileData: any;
    foodId: string | null;
  }>()
);

export const addFoodsDate = createAction(
  '[Food] Add Date',
  props<{ 
    date: String | null;
    foodId: string | null;
  }>()
);

export const deleteFood = createAction(
  '[Food] Delete Food',
  props<{ id: string }>()
);

export const deleteFreezer = createAction(
  '[Freezer] Delete Freezer',
  props<{ id: string }>()
);