import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ShoppingListComponent },
    ]), 
    FormsModule,
    ReactiveFormsModule, 
    SharedModule,
  ],
})
export class ShoppingListModule {}