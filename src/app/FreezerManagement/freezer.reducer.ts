import { createReducer, on } from '@ngrx/store';
import { addFreezer, addFach, addFood, deleteFood, deleteFreezer, addFoodsPhoto, addFoodsDate } from './freezer.actions';
import { Freezer, Food } from './freezer.models';
import { v4 as uuid } from 'uuid';

export interface FreezerState {
  freezers: Freezer[];
}

export const initialStateForFreezer: FreezerState = {
  freezers: []
};

export interface FoodState {
  foods: Food[];
}

export const initialStateForFood: FoodState = {
  foods: []
};

export const freezerReducer = createReducer(
  initialStateForFreezer,

  on(addFreezer, (state, { name, faecherAnzahl }) => ({
    ...state,
    freezers: [
      ...state.freezers,
      {
       id: uuid(),
        name,
        faecher: Array.from({ length: faecherAnzahl }).map((_, i) => ({
          id: uuid(),
          nummer: i + 1,
          bezeichnung: ''
        })) 
      }
    ]
  })),

  on(addFach, (state, { freezerId, fach }) => ({
    ...state,
    freezers: state.freezers.map(f =>
      f.id === freezerId ? { ...f, faecher: [...f.faecher, fach] } : f
    )
  })),

  on(deleteFreezer, (state, { id }) => ({
    ...state,
    freezers: state.freezers.filter(freezer => freezer.id !== id)
  }))
);

export const foodReducer = createReducer(
  initialStateForFood,
  on(addFood, (state, { name, freezerId, fachNumber, bezeichnung, photo, date }) => ({
    ...state,
    foods: [
      ...state.foods,
      {
        id: uuid(),
        name,
        freezerId,
        fachNumber,
        bezeichnung,
        photo: photo ?? null,
        date: date ?? null
      }
    ]
  })),
  on(deleteFood, (state, { id }) => ({
    ...state,
    foods: state.foods.filter(food => food.id !== id)
  })),

  on(addFoodsPhoto, (state, { fileData, foodId }) => ({
    ...state,
    foods: state.foods.map(food =>
      food.id === foodId ? { ...food, photo: {fileData, foodId} } : food
    )
  })),
  on(addFoodsDate, (state, { date, foodId }) => ({
    ...state,
    foods: state.foods.map(food =>
      food.id === foodId ? { ...food, date } : food
    )
  }))
);

