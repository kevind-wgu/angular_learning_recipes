import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { State } from '../recipes.store';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  
})
export class RecipeListComponent implements OnInit {
  subscription: Subscription;
  recipes: Observable<Recipe[]>

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.recipes = this.store.select('recipes').pipe(map(state => {
      console.log("RecipeListComponent, store", state);
      return state.recipes
    }));
  }
}
