import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
   new Recipe('A Test Recipe', 'This is simply a test', 'https://www.foodandwine.com/thmb/fVmYbaQzXCz1Prx8VxrW9sMcjMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg'),
   new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://www.foodandwine.com/thmb/fVmYbaQzXCz1Prx8VxrW9sMcjMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
