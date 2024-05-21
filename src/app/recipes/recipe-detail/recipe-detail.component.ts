import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { ShoppingListService } from "src/app/shopping/shopping-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor( private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.recipe = this.recipeService.getRecipe(params['name']));
  }

  addIngredientsToShoppingList() {
    console.log("ADDING");
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe(name: String) {
    this.recipeService.deleteRecipe(name);
    this.router.navigate(['/recipes'])
  }
}