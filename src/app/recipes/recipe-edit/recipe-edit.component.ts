import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeEditName: string;
  recipeEditMode: boolean;
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];

  constructor(private route: ActivatedRoute, 
    private recipeService: RecipeService) 
  { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeEditName = params['name'];
      if (this.recipeEditName) {
        const recipe = this.recipeService.getRecipe(this.recipeEditName);
        this.name = recipe.name;
        this.description = recipe.description;
        this.imagePath = recipe.imagePath;
        this.ingredients = recipe.ingredients;
        this.recipeEditMode = true;
      }
      else {
        this.name = '';
        this.description = '';
        this.imagePath = '';
        this.ingredients = [];
        this.recipeEditMode = false;
      }
    });
  }

}
