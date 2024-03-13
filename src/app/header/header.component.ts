import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() headerChanged = new EventEmitter<string>();
  @Input() selectedHeader: string;
  collapsed=true;

  constructor() { }

  ngOnInit(): void {
  }

  onHeaderChange(newHeader: string) {
    this.headerChanged.emit(newHeader);
  }
}
