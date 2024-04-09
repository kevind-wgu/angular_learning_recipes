import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shipping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild("nameInput") nameInput: HTMLFormElement;
  @ViewChild("amountInput") amountInput: HTMLFormElement;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddClicked() {
    const name = this.nameInput.nativeElement.value;
    const amountStr = this.amountInput.nativeElement.value;
    const amount = Number(amountStr);
    console.log("amuntStr", typeof amountStr);
    if (name && amount) {

      console.log("ADD ITEM", name, amount);
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
  }

}
