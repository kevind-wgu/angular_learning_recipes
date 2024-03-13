import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeSelected: EventEmitter<Recipe>;
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  selectThisRecipe() {
    console.log("EMIT RECIPE");
    this.recipeSelected.emit(this.recipe);
  }
}
