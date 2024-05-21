import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];


  addIngredients(addIngredients: Ingredient[]) {
    console.log("Adding Ingredients", addIngredients);
    this.ingredients.push(...addIngredients);
    this.triggerIngredientsChanged();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.triggerIngredientsChanged();
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.triggerIngredientsChanged();
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.triggerIngredientsChanged();
  }

  private triggerIngredientsChanged() {
    this.ingredientsChanged.next(this.getIngredients().slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
}