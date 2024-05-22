import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListStore from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") form: NgForm;
  subscription: Subscription;
  editMode = false;

  constructor(private store: Store<ShoppingListStore.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((shoppingList) => {
      if (shoppingList.editedIngredientIndex >= 0) {
        this.editMode = true;
        const ingredient = shoppingList.editedIngredient;
        this.form.setValue({
          'name': ingredient.name,
          'amount': ingredient.amount
        });
      }
      else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      const ingredient = new Ingredient(this.form.value.name, +this.form.value.amount)
      if (this.editMode) {
        this.store.dispatch(ShoppingListStore.editIngredient({value: ingredient}));
      }
      else {
        this.store.dispatch(ShoppingListStore.addIngredient({value: ingredient}));
      }
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(ShoppingListStore.cancelEdit())
  }

  onDelete() {
    this.store.dispatch(ShoppingListStore.deleteIngredient());
    this.onClear();
  }

}
