import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipies';
  currentHeader = 'recipies';

  onHeaderChanged(newHeader: string) {
    this.currentHeader = newHeader;
  }

}
