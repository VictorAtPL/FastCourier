import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navLinks;

  constructor() {
    this.navLinks = [
      {
        'label': 'Strona główna',
        'path': 'powitanie'
      },
      {
        'label': 'Dodaj regulamin',
        'path': '/regulaminy/dodaj'
      }
    ];
  }
}
