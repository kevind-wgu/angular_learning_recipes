import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingList$: Observable<{ ingredients: Ingredient[]}>;
  private idChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: { ingredients: Ingredient[]} }>) { }

  ngOnInit(): void {
    this.shoppingList$ = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
  }
}
