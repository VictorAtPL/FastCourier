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
        'label': 'Napisz wiadomość',
        'path': '/wiadomosc/wyslij'
      },
      {
        'label': 'Zgłoś użytkownika',
        'path': '/uzytkownik/zglos'
      }
    ];
  }
}
