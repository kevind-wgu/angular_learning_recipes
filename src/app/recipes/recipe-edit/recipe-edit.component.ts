import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { relative } from 'path';

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
    private recipeService: RecipeService) 
  { }

  ngOnInit(): void {
    this.initForm(null);

    this.subscription = this.route.params.subscribe((params) => {
      this.recipeEditName = params['name'];
      if (this.recipeEditName) {
        const recipe = this.recipeService.getRecipe(this.recipeEditName);
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
      this.recipeService.updateRecipe(this.recipeEditName, this.form.value);
      this.router.navigate(['../..', this.form.value.name], {relativeTo: this.route})
    }
    else {
      this.recipeService.addRecipe(this.form.value);
      this.router.navigate(['..', this.form.value.name], {relativeTo: this.route})
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
