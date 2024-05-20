import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private recipiesService: RecipeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onFetchData() {
    this.recipiesService.loadRecipiesFromStore().subscribe();
  }
  
  onSaveData() {
    this.recipiesService.writeRecipiesToStore();
  }
}
