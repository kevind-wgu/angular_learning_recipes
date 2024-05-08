import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipiesService: RecipeService) {}

  onFetchData() {
    this.recipiesService.loadRecipiesFromStore().subscribe();
  }
  
  onSaveData() {
    this.recipiesService.writeRecipiesToStore();
  }
}
