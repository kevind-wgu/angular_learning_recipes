import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable, map, of, switchMap, take, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.store";
import { Actions, ofType } from "@ngrx/effects";
import * as RecipesStore from "./recipes.store"

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<AppState>, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // TODO: Fix this
    // this.store.dispatch(RecipesStore.loadFromStore());
    // return this.actions$.pipe(ofType(RecipesStore.setRecipes), map(r => r.recipes), take(1));
    return this.store.select('recipes').pipe(
      take(1),
      switchMap((recipeStore) => {
        if (!recipeStore.recipesLoaded) {
          console.log("Load from store")
          this.store.dispatch(RecipesStore.loadFromStore());
          return this.actions$.pipe(
            ofType(RecipesStore.setRecipes), 
            map((r) => r.recipes), 
            tap(r => {console.log("Load from store done");}), 
            take(1),
          )
        }
        console.log("Use what we already have", recipeStore.recipes);
        return of(recipeStore.recipes);
      }),
    );
  }
}