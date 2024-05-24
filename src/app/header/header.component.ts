import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import * as AuthStore from '../auth/auth.store';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private recipesService: RecipeService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(auth => {
        this.isAuthenticated = !!auth.user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(AuthStore.logout());
  }

  onFetchData() {
    this.recipesService.loadRecipesFromStore().subscribe();
  }
  
  onSaveData() {
    this.recipesService.writeRecipesToStore();
  }
}
