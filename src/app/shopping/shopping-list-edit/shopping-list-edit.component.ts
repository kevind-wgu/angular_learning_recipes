import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shipping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") form: NgForm;
  subscription: Subscription;
  editIndex: number;
  editMode = false;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editIndex = index;
      this.editMode = true;
      const ingredient = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        'name': ingredient.name,
        'amount': ingredient.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      const ingredient = new Ingredient(this.form.value.name, +this.form.value.amount)
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editIndex, ingredient);
      }
      else {
        this.shoppingListService.addIngredient(ingredient);
      }
      this.onClear();
    }
  }

  onClear() {
    this.editMode = false;
    this.editIndex = null;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onClear();
  }

}
