import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeItemComponent } from "./recipes/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipies', pathMatch: 'full' },
  {path: 'recipies', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full' },
    {path: 'new', component: RecipeEditComponent},
    {path: ':name', component: RecipeDetailComponent},
    {path: ':name/edit', component: RecipeEditComponent},
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