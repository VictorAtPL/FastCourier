import {Component, OnInit} from '@angular/core';
import {MatIconRegistry, MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {UwierzytelnianieService} from './services/uwierzytelnianie.service';
import {PowiadomieniaService} from "./services/powiadomienia.service";

/**
 * Logika biznesowa dla głównego komponentu serwisu, ładującego inne komponenty w zależności od aktualnie przeglądanej strony
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  zalogowanyUzytkownik: any;
  powiadomienia: any[] = [];
  nieprzeczytanychPowiadomien = 0;

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
   * @param {UwierzytelnianieService} autentykacjaService
   */
  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer, private router: Router, public snackBar: MatSnackBar,
              private autentykacjaService: UwierzytelnianieService,
              private powiadomieniaService: PowiadomieniaService) {
  }

  ngOnInit(): void {
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
      },
      {
        'label': 'Pomoc',
        'path': 'serwis/informacje',
        'enable': true,
        'role': ['', 'ROLE_USER', 'ROLE_ADMIN']
      }
    ];

    /**
     * Metoda sprawdzająca poprawność zalogowania
     */
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      if (next != null) {
        this.zalogowanyUzytkownik = next;

        this.powiadomieniaService.getPowiadomieniaUzytkownika(this.zalogowanyUzytkownik.login).subscribe((result) => {
          this.powiadomienia = result._embedded.powiadomienies;

          this.powiadomienia.sort((a, b) => {
            if (a.dataDodania > b.dataDodania) {
              return 1;
            } else if (a.dataDodania === b.dataDodania) {
              return 0;
            } else {
              return -1;
            }
          });

          this.powiadomienia.forEach((value, index) => {
            if (!value.przeczytane) {
              this.nieprzeczytanychPowiadomien++;
            }

            this.powiadomienia[index].dataDodania = new Date(this.powiadomienia[index].dataDodania);
          });
        });
      }
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
