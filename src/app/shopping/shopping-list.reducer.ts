import { createAction, createReducer, on, props } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number,
}

export interface AppState {
  shoppingList: State
}

const INITIAL_STATE : State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const addIngredient = createAction('[Ingredient] Add', 
  props<{value: Ingredient}>(),
);

export const addIngredients = createAction('[Ingredient] Add Multiple', 
  props<{value: Ingredient[]}>(),
);

export const deleteIngredient = createAction('[Ingredient] Delete');

export const editIngredient = createAction('[Ingredient] Edit', 
  props<{value: Ingredient}>(),
);

export const startEdit = createAction('[Ingredient] Start Edit', 
  props<{index: number}>(),
);

export const cancelEdit = createAction('[Ingredient] Cancel Edit');

export const shoppingListReducer = createReducer(
  INITIAL_STATE,
  on(addIngredient, (state, action) => {
    return {...state, ingredients: [...state.ingredients, action.value]}
  }),
  on(addIngredients, (state, action) => {
    const newState = {...state, ingredients: [...state.ingredients, ...action.value]}
    return newState;
  }),
  on(deleteIngredient, (state, action) => {
    const newState = {...state, ingredients: state.ingredients.filter((v,i) => i !== state.editedIngredientIndex)}
    return newState;
  }),
  on(editIngredient, (state, action) => {
    if (state.editedIngredientIndex < 0) {
      return state;
    }
    const oldIngredient = state.ingredients[state.editedIngredientIndex];
    const newIngredient = {...oldIngredient, ...action.value}
    const newState = {...state, ingredients: [...state.ingredients]}
    newState.ingredients[state.editedIngredientIndex] = newIngredient;
    return newState;
  }),
  on(startEdit, (state, action) => {
    return {...state, editedIngredient: {...state.ingredients[action.index]}, editedIngredientIndex: action.index};
  }),
  on(cancelEdit, (state, action) => {
    return {...state, editedIngredient: null, editedIngredientIndex: -1};
  }),
);