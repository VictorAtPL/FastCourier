import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';

/**
 * Logika biznesowa dla komponentu edycji profilu użytkownika.
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-edycja-profilu-uzytkownika',
  templateUrl: './edycja-profilu-uzytkownika.component.html',
  styleUrls: ['./edycja-profilu-uzytkownika.component.css']
})
export class EdycjaProfiluUzytkownikaComponent implements OnInit {
  /**
   * Obiekt przechowujący formualrz edycji użytkownika.
   */
  edytujProfilUzytkownikaForm: FormGroup;

  /**
   * Obiekt przechowujący aktualnie zalogowanego użytkownika.
   */
  zalogowanyUzytkownik: any;

  haslo: FormControl;
  phaslo: FormControl;

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

  /**
   * Konstruktor formularza, umożliwiający użycie dodatkowych serwisów.
   * @param {UwierzytelnianieService} autentykacjaService
   * @param {UzytkownikService} uzytkownikService
   * @param {MatSnackBar} snackBar
   */
  constructor(private autentykacjaService: UwierzytelnianieService, private uzytkownikService: UzytkownikService,
              public snackBar: MatSnackBar) {
  }

  /**
   * Metoda inicjująca formualrz. Ustawia parametry walidacji.
   */
  ngOnInit() {
    this.phaslo = new FormControl('',);
    this.haslo = new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]);
    this.phaslo.setValidators([this.czyHasloTakieSamo(this.haslo)]);
    this.autentykacjaService.czyZalogowany().subscribe((uzytkownik: any) => {
      if (uzytkownik != null) {
        uzytkownik.dataUrodzenia = new Date(uzytkownik.dataUrodzenia);
        this.zalogowanyUzytkownik = uzytkownik;

        this.edytujProfilUzytkownikaForm = new FormGroup({
          haslo: this.haslo,
          phaslo: this.phaslo,
          email: new FormControl('', Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]' +
            '\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')),
          imie: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
          nazwisko: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
          dataUrodzenia: new FormControl(new Date()),
          wojewodztwo: new FormControl(this.zalogowanyUzytkownik.wojewodztwo),
          miejscowosc: new FormControl(this.zalogowanyUzytkownik.miejscowosc),
          ulica: new FormControl(),
          numerTelefonu: new FormControl('', Validators.pattern('^[0-9\\-\\+]{9,15}$'))
        });
      }
    });
  }

  /**
   * Metoda odpowiedzialna za edycje danych użytkownika.
   * @param data
   */
  edytujProfilUzytkownika(data: any) {
    for (const key in data) {
      if (data[key] == null || data[key].length == 0) {
        delete data[key];
      }
    }

    if (data.dataUrodzenia) {
      data.dataUrodzenia = new Date(data.dataUrodzenia).toISOString();
    }

    this.uzytkownikService.patchUzytkownik(this.zalogowanyUzytkownik.login, data).subscribe((result) => {
      const refSnackBar = this.snackBar.open('Zedytowano ustawienia profilu.', null, {
        duration: 2000,
      });
    }, () => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    });
  }

  czyHasloTakieSamo(haslo: FormControl) {
    return (input: FormControl) => {
      const czyRowne = input.value === haslo.value;
      return czyRowne ? null : {czyHasloJestTakieSamo: true};
    };
  }

  weryfikujHaslo() {
    this.edytujProfilUzytkownikaForm.controls['haslo'].updateValueAndValidity();
  }

  weryfikujPHaslo() {
    this.edytujProfilUzytkownikaForm.controls['phaslo'].updateValueAndValidity();
  }
}
