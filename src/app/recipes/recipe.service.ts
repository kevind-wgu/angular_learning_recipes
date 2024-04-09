import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'French Toast', 
      'This is a simply delicious French Toast Recipe', 
      'https://www.allrecipes.com/thmb/VjVrkCVYaalH2JXogJMoFQ_a-zI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7016-french-toast-mfs-010-0e1007bf0b47433abe91f2f0c74e5a27.jpg',
      [
        new Ingredient('Eggs', 1),
        new Ingredient('Milk', 1),
        new Ingredient('Vannila', 1),
        new Ingredient('Cinnamon', 1),
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'Super Tasty, Fat and Healthy, Burger', 
      'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440',
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('Bun', 1),
      ]
      ),
   ];
 
   getRecipes() {
    return this.recipes.slice();
   }
}