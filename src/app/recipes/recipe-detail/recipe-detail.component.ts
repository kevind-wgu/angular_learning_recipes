import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";

import { Recipe } from "../recipe.model";
import { AppState } from "src/app/store/app.store";
import { addIngredients } from "src/app/shopping/shopping-list.store";
import * as RecipesStore from '../recipes.store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  name: string;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
    ) {
  }

  ngOnInit(): void {
    console.log("In Recipe Detail");
    this.route.params.pipe(
      switchMap((params) => {
        this.name = params['name'];
        return this.store.select('recipes');
      }),
      map((recipeState) => {
        console.log("RecipeDetail find recipie by name", recipeState, this.name);
        return recipeState.recipes.find(r => r.name === this.name);
      }),
    ).subscribe((recipe) => this.recipe = recipe);
  }

  addIngredientsToShoppingList() {
    console.log("ADDING");
    this.store.dispatch(addIngredients({value: this.recipe.ingredients}));
  }

  deleteRecipe(name: string) {
    this.store.dispatch(RecipesStore.deleteRecipe({name: name}));
    this.router.navigate(['/recipes'])
  }
}