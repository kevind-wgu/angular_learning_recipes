import { Store, createAction, createReducer, on, props } from "@ngrx/store";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, map, switchMap, tap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { AppState } from "../store/app.store";
import { Router } from "@angular/router";

const URL = environment.firebaseUrl;

export interface State {
  recipes: Recipe[],
  recipesLoaded: boolean,
}

const INITAL_STATUE = {
  recipes: [],
  recipesLoaded: false,
}

export const addRecipe = createAction('[Recipes] Add', 
  props<{value: Recipe}>(),
);

export const updateRecipe = createAction('[Recipes] Update', 
  props<{name: string, value: Recipe}>(),
);

export const deleteRecipe = createAction('[Recipes] Delete', 
  props<{name: string}>(),
);

export const setRecipes = createAction('[Recipes] Set All', 
  props<{recipes: Recipe[]}>(),
);

export const loadFromStore = createAction('[Recipes] Load From Store');
export const writeToStore = createAction('[Recipes] Write To Store');

const findRecipeIndex = (recipes: Recipe[], name: string) : number => {
  return recipes.findIndex(r => r.name === name);
}

export const recipesReducer = createReducer(
  INITAL_STATUE,
  on(addRecipe, (state, action) => {
    return {...state, recipes: [...state.recipes, action.value]};
  }),
  on(updateRecipe, (state, action) => {
    const index = findRecipeIndex(state.recipes, action.name);
    const newRecipe = {...state.recipes[index], ...action.value};
    const newRecipies = [...state.recipes];
    newRecipies[index] = newRecipe;
    console.log("Update Recipe - ", newRecipe, index, newRecipies);
    return {...state, recipes: newRecipies, editRecipe: null, editRecipeName: null};
  }),
  on(deleteRecipe, (state, action) => {
    const newRecipies = state.recipes.filter((v,i) => v.name !== action.name);
    return {...state, recipes: newRecipies, editRecipe: null, editRecipeName: null};
  }),
  on(setRecipes, (state, action) => {
    const clone = action.recipes.map(recipe => { 
      return {
        ...recipe, 
        ingredients: recipe.ingredients ?? []
      }
    });
    console.log("Set recipes - ", clone)
    return {...state, recipesLoaded: true, recipes: clone};
  }),
  // TODO: Still needs hooked up.
);

@Injectable()
export class RecipesEffects {
  constructor(private actions$: Actions, private store: Store<AppState>, private http: HttpClient, private router: Router) {}

  loadFromStore = createEffect(
    () => this.actions$.pipe(
      ofType(loadFromStore),
      switchMap(() => {
        return this.http.get<Recipe[]>(URL + '/recipes.json')
      }),
      map((recipes) => {
        return setRecipes({recipes: recipes});
      }),
  ));

  navigateToSavedRecipe = createEffect(
    () => this.actions$.pipe(
      ofType(addRecipe, updateRecipe),
      tap((action) => {
        this.router.navigate(['recipes', action.value.name]);
      })
    ),
    {dispatch: false}
  )

  writeToStore = createEffect(
    () => this.actions$.pipe(
      ofType(writeToStore),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, recipeStore]) => {
        return this.http.put(URL + '/recipes.json', recipeStore.recipes);
      }),
      tap(() => {
        console.log('Done writing to store');
      }),
      catchError((e) => {
        console.log("Error writing to store", e);
        return of('Error writing to store');
      })
  ), {dispatch: false});
}