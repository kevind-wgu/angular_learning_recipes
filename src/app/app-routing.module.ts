import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";

const appRoutes: Routes = [
  {path: '', component: RecipeListComponent },
  {path: 'recipies', component: RecipeListComponent },
  {path: 'shopping', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}