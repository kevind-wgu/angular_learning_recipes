import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeItemComponent } from "./recipes/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipies', pathMatch: 'full' },
  {path: 'recipies', component: RecipesComponent, children: [
    {path: ':name', component: RecipeDetailComponent},
  ] },
  {path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}