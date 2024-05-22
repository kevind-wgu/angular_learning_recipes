import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Store } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import { addIngredients } from "src/app/shopping/shopping-list.reducer";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<{shoppingList: { ingredients: Ingredient[]} }>
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.recipe = this.recipeService.getRecipe(params['name']));
  }

  addIngredientsToShoppingList() {
    console.log("ADDING");
    this.store.dispatch(addIngredients({value: this.recipe.ingredients}));
  }

  deleteRecipe(name: String) {
    this.recipeService.deleteRecipe(name);
    this.router.navigate(['/recipes'])
  }
}