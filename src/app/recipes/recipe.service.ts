import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Observable, Subject, map, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

const URL = environment.firebaseUrl;

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  //   new Recipe(
  //     'French Toast', 
  //     'This is a simply delicious French Toast Recipe', 
  //     'https://www.allrecipes.com/thmb/VjVrkCVYaalH2JXogJMoFQ_a-zI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7016-french-toast-mfs-010-0e1007bf0b47433abe91f2f0c74e5a27.jpg',
  //     [
  //       new Ingredient('Eggs', 2),
  //       new Ingredient('Milk', 2),
  //       new Ingredient('Vannila', 1),
  //       new Ingredient('Cinnamon', 1),
  //       new Ingredient('Bread', 10),
  //     ]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger', 
  //     'Super Tasty, Fat and Healthy, Burger', 
  //     'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440',
  //     [
  //       new Ingredient('Hamburger', 1),
  //       new Ingredient('Bun', 1),
  //     ]
  //     ),
  //  ];

   constructor(private http: HttpClient) {}
 
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(name: string): Recipe {
    return this.recipes.find((r) => r.name === name);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(name: String, recipe: Recipe) {
    const index = this.recipes.findIndex((r) => r.name === name);
    if (index >= 0) {
      this.recipes[index] = recipe;
    }
    else {
      this.recipes.push(recipe);
    }
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(name: String) {
    const index = this.recipes.findIndex((r) => r.name === name);
    if (index >= 0) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes);
    }
  }

  loadRecipesFromStore() : Observable<Recipe[]> {
    return this.http.get<Recipe[]>(URL + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          console.log("RECIPES", recipes);
          return recipes.map(recipe => { 
            return {
              ...recipe, 
              ingredients: recipe.ingredients ?? []
            }
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes);
        }
      ));
  }

  writeRecipesToStore() {
    this.http.put(URL + '/recipes.json', this.recipes).subscribe(res => {
      console.log("Stored", res);
    });
  }
}