import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

/**
 * Logika biznesowa dla rejestracji użytkownika
 */
@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css'],
  viewProviders: [UzytkownikService]
})
export class RejestracjaComponent implements OnInit {

  /**
   * Grupa formatek dotyczących rejestracji użytkownika.
   */
  rejestracjaForm: FormGroup;

  /**
   * Formatka do wpisywania hasla.
   */
  haslo: FormControl;

  /**
   * Formatka do powtórzenia hasła.
   */
  haslo2: FormControl;

  constructor(private uzytkownikService: UzytkownikService,
              private router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.haslo2 = new FormControl('');
    this.haslo = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]);
    this.haslo2.setValidators([Validators.required, this.czyHasloTakieSamo(this.haslo)]);

    this.rejestracjaForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      haslo: this.haslo,
      haslo2: this.haslo2,
      email: new FormControl('', [Validators.required, Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\' +
        's@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]),
      imie: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')]),
      nazwisko: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')]),
      dataUrodzenia: new FormControl(new Date(), [Validators.required]),
      wojewodztwo: new FormControl(''),
      miejscowosc: new FormControl(''),
      ulica: new FormControl(''),
      numerTelefonu: new FormControl('', [Validators.pattern('^[0-9\\-\\+]{9,15}$')])
    });

  }

  /**
   * Metoda sprawdzająca czy powtórzone hasło jest takie samo.
   * @param {FormControl} haslo
   * @returns {(input: FormControl) => {czyHasloJestTakieSamo: boolean}}
   */
  czyHasloTakieSamo(haslo: FormControl) {
    return (input: FormControl) => {
      const czyRowne = input.value === haslo.value;
      return czyRowne ? null : {czyHasloJestTakieSamo: true};
    };
  }

  /**
   * Metoda uruchamiająca walidację powtórzonego hasła.
   */
  weryfikujHaslo2() {
    this.rejestracjaForm.controls['haslo2'].updateValueAndValidity();
  }

  /**
   * Metoda uruchamiająca walidację hasła.
   */
  weryfikujHaslo() {
    this.rejestracjaForm.controls['haslo'].updateValueAndValidity();
  }

  /**
   * Metoda rejsetrująca użytkownika.
   * @param model
   */
  zarejestruj(model: any) {
    this.uzytkownikService.postUzytkownik(model).subscribe(result => {
        const refSnackBar = this.snackBar.open('Zarejestrowano w systemie. Następuje przekierowanie do strony logowania.', null, {
          duration: 2000,
        });

        this.rejestracjaForm.reset();

        refSnackBar.afterDismissed().subscribe(next => {
          this.router.navigate(['logowanie']);
        });
      },
      error2 => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
          duration: 2000,
        });
      });
  }
}
