import { Component, OnDestroy, OnInit } from '@angular/core';
import * as AuthStore from '../auth/auth.store';
import * as RecipesStore from '../recipes/recipes.store';
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

  constructor(private store: Store<AppState>) {}

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
    this.store.dispatch(RecipesStore.loadFromStore());
  }
  
  onSaveData() {
    this.store.dispatch(RecipesStore.writeToStore());
  }
}
