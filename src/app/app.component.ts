import {Component} from '@angular/core';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AutentykacjaService} from './services/autentykacja.service';

/**
 * Logika biznesowa dla głównego komponentu serwisu, ładującego inne komponenty w zależności od aktualnie przeglądanej strony
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  zalogowanyUzytkownik: any;

  /**
   * Tablica z linkami dostępnymi w menu
   */
  public navLinks: any[];

  /**
   * Konstruktor klasy app.components.ts
   * @param {MatIconRegistry} _iconRegistry
   * @param {DomSanitizer} _domSanitizer
   * @param {Router} router
   * @param {MatSnackBar} snackBar
   * @param {AutentykacjaService} autentykacjaService
   */
  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer, private router: Router, public snackBar: MatSnackBar,
              private autentykacjaService: AutentykacjaService) {
    this.navLinks = [
      {
        'label': 'Strona główna',
        'path': 'powitanie',
        'enable': true,
        'role': ['', 'ROLE_USER', 'ROLE_ADMIN']
      },
      {
        'label': 'Przejrzyj dostepne oferty',
        'path': 'oferta/lista',
        'enable': true,
        'role': ['', 'ROLE_USER', 'ROLE_ADMIN']
      },
      {
        'label': 'Panel użytkownika',
        'path': 'uzytkownik/panel',
        'enable': true,
        'role': ['ROLE_USER', 'ROLE_ADMIN']
      },
      {
        'label': 'Logowanie',
        'path': 'logowanie',
        'enable': true,
        'role': ['']
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
        'role': ['', 'ROLE_USER', 'ROLE_ADMIN']
      },
      {
        'label': 'Panel administratora',
        'path': 'administrator/panel',
        'enable': true,
        'role': ['ROLE_ADMIN']
      }
    ];

    /**
     * Metoda sprawdzająca poprawność zalogowania
     */
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });
  }

  /**
   * Metoda wylogowująca uzytkownika
   */
  wyloguj() {
    this.autentykacjaService.wyloguj();

    const snackBarRef = this.snackBar.open('Pomyślnie wylogowano. Poczekaj chwilę.', null, {
      duration: 2000,
    });

    snackBarRef.afterDismissed().subscribe(next => this.router.navigate(['']));
  }
}
