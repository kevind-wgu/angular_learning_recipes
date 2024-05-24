import * as ShoppingListStore from "../shopping/shopping-list.store";
import * as AuthStore from "../auth/auth.store";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  shoppingList: ShoppingListStore.State,
  auth: AuthStore.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: ShoppingListStore.shoppingListReducer,
  auth: AuthStore.authReducer,
};
