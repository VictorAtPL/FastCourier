import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private navLinks;

  constructor() {
    this.navLinks = [
      {
        'label': 'Strona główna',
        'path': 'powitanie'
      },
      {
        'label': 'Zgłoś uwagę',
        'path': 'menuPodreczne/zglaszanieUwagi'
      }
    ];
  }
}
