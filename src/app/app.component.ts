import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Logika biznesowa dla głównego komponentu serwisu, ładującego inne komponenty w zależności od aktualnie przeglądanej strony
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Tablica z linkami dostępnymi w menu
   */
  public navLinks: any[];

  /**
   *
   * @param {MatIconRegistry} _iconRegistry
   * @param {DomSanitizer} _domSanitizer
   */
  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this.navLinks = [
      {
        'label': 'Strona główna',
        'path': 'powitanie',
        'enable': true,
        'role': ['']
      },
      {
        'label': 'Panel użytkownika',
        'path': 'uzytkownik/panel',
        'enable': true,
        'role': ['', 'ROLE_USER']
      },
      {
        'label': 'Zgłoś użytkownika',
        'path': 'uzytkownik/zglos',
        'enable': false,
      },
      {
        'label': 'Zgłoś ofertę',
        'path': 'oferta/zglos',
        'enable': false
      },
      {
        'label': 'Zgłoś uwagę',
        'path': 'uwaga/zglos',
        'enable': true,
        'role': ['', 'ROLE_USER']
      },
      {
        'label': 'Panel administratora',
        'path': 'administrator/panel',
        'enable': true,
        'role': ['ROLE_ADMIN']
      }
    ];
  }
}
