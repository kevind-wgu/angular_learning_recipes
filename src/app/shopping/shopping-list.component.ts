import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListStore from './shopping-list.store';
import { AppState } from '../store/app.store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList$: Observable<{ ingredients: Ingredient[]}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.shoppingList$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListStore.startEdit({index: index}));
  }
}
