import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';
import {OfertaService} from "../../services/oferta.service";

/**
 * Logika biznesowa dla komponentu logowania
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent {

  logowanieForm: FormGroup;

  /**
   * Konstruktor powołujący formularz, dodający możliwość stosowania dodatkowych serwisów.
   * @param {UwierzytelnianieService} autentykacjaService
   * @param {Router} router
   * @param {MatSnackBar} snackBar
   */
  constructor(private autentykacjaService: UwierzytelnianieService,
              private router: Router,
              public snackBar: MatSnackBar,
              private ofertaService: OfertaService) {
    this.logowanieForm = new FormGroup({
      login: new FormControl(''),
      haslo: new FormControl('')
    });
  }

  /**
   * Metoda odpowiedzialna za zalogowanie się.
   */
  zaloguj() {
    this.autentykacjaService.weryfikuj(this.logowanieForm.controls['login'].value,
      this.logowanieForm.controls['haslo'].value).subscribe(uzytkownik => {
        if (uzytkownik && uzytkownik.haslo === this.logowanieForm.controls['haslo'].value) {
          if (uzytkownik.zablokowany) {
            this.snackBar.open('Odmowa zalogowania: Twoje konto jest zablokowane.', null, {
              duration: 2000,
            });
          } else {
            this.autentykacjaService.zaloguj(this.logowanieForm.controls['login'].value, uzytkownik);
            this.snackBar.open('Zalogowano do systemu. Poczekaj chwilę.', null, {
              duration: 2000,
            });

            this.router.navigate(['']);

            this.sprawdzNoweWystawieniaOcen();
          }
        } else {
          this.snackBar.open('Hasło jest nie prawidłowe.', null, {
            duration: 2000,
          });
        }
      },
      () => {
        this.snackBar.open('Podane konto nie istnieje.', null, {
          duration: 2000,
        });
      });
  }

  sprawdzNoweWystawieniaOcen() {

  }
}
