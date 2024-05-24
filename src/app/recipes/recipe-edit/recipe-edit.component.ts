import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import * as RecipesStore from '../recipes.store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form: FormGroup;
  ingredients: FormArray;
  recipeEditName: string;
  recipeEditMode: boolean;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.initForm(null);

    this.subscription = this.route.params.pipe(
      switchMap((params) => {
        this.recipeEditName = params['name'];
        return this.store.select('recipes');
      }),
      map((recipeStore) => {
        if (this.recipeEditName) {
            return recipeStore.recipes.find((r) => r.name === this.recipeEditName);
        }
        return null;
      })
    ).subscribe((recipe) => {
      if (recipe) {
        this.initForm(recipe);
        this.recipeEditMode = true;
      }
      else {
        this.initForm(null);
        this.recipeEditMode = false;
      }
    });
  }

  private initForm(recipe: Recipe) {
    if (!recipe) {
      recipe = new Recipe(null, null, null, []);
    }
    this.ingredients = new FormArray([]);
    this.form = new FormGroup({
      'name': new FormControl(recipe.name, [Validators.required]),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, [Validators.required]),
      'ingredients': this.ingredients 
    })

    for (let ingredient of recipe.ingredients) {
      this.ingredients.push(this.createIngredientFormGroup(ingredient));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    console.log("Submit", this.form);

    if (this.recipeEditName) {
      this.store.dispatch(RecipesStore.updateRecipe({name: this.recipeEditName, value: this.form.value}));
    }
    else {
      this.store.dispatch(RecipesStore.addRecipe({value: this.form.value}));
    }
  }

  onCancel() {
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  private createIngredientFormGroup(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingredient.name, [Validators.required]),
      'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    });
  }

  onAddIngredient() {
    this.ingredients.push(this.createIngredientFormGroup(new Ingredient(null, null)));
  }

  onDeleteIngredient(index: number) {
    console.log("Delete Ingredient", index);
    this.ingredients.removeAt(index);
  }



}
