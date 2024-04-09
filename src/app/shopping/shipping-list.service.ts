import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientsChanged = new EventEmitter();

  addIngredients(addIngredients: Ingredient[]) {
    console.log("Adding Ingredients", addIngredients);
    this.ingredients.push(...addIngredients);
    this.ingredientsChanged.emit(this.getIngredients().slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients().slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }
}