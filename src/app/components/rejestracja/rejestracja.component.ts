import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

/**
 * Logika biznesowa dla komponentu rejestracji
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css'],
  viewProviders: [UzytkownikService]
})
export class RejestracjaComponent implements OnInit {
  /**
   * Obiekt przechowujący dzisiejszą datę
   */
  maxDate: Date;

  rejestracjaForm: FormGroup;

  /**
   * Formatka do wpisywania hasla.
   */
  haslo: FormControl;

  /**
   * Formatka do powtórzenia hasła.
   */
  haslo2: FormControl;

  wojewodztwa: string[] = ['dolnośląskie',
    'kujawsko-pomorskie',
    'lubelskie',
    'lubuskie',
    'łódzkie',
    'małopolskie',
    'mazowieckie',
    'opolskie',
    'podkarpackie',
    'podlaskie',
    'pomorskie',
    'śląskie',
    'świętokrzyskie',
    'warmińsko-mazurskie',
    'wielkopolskie',
    'zachodniopomorskie'];

  constructor(private uzytkownikService: UzytkownikService,
              private router: Router, public snackBar: MatSnackBar) {
  }

  /**
   * Metoda wywoływana przy próbie załadowania formularza. Ustawia parametry walidatorów.
   */
  ngOnInit(): void {

    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
      dataUrodzenia: new FormControl('', [Validators.required]),
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
   * Metoda odpowiedzialna za zarejestrowanie nowego użytkownika, w systemie.
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
