import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutentykacjaService} from '../../services/autentykacja.service';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Logika biznesowa dla komponentu edycji profilu użytkownika
 */
@Component({
  selector: 'app-edycja-profilu-uzytkownika',
  templateUrl: './edycja-profilu-uzytkownika.component.html',
  styleUrls: ['./edycja-profilu-uzytkownika.component.css']
})
export class EdycjaProfiluUzytkownikaComponent implements OnInit {
  edytujProfilUzytkownikaForm: FormGroup;
  zalogowanyUzytkownik: any;
  haslo: FormControl;
  phaslo: FormControl;

  constructor(private autentykacjaService: AutentykacjaService, private uzytkownikService: UzytkownikService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.phaslo = new FormControl('',);
    this.haslo = new FormControl('', [Validators.minLength(8), Validators.maxLength(30)]);
    this.phaslo.setValidators([this.czyHasloTakieSamo(this.haslo)]);
    this.autentykacjaService.czyZalogowany().subscribe((uzytkownik: any) => {
      if (uzytkownik != null) {
        uzytkownik.dataUrodzenia = new Date(uzytkownik.dataUrodzenia);
        this.zalogowanyUzytkownik = uzytkownik;
      }
    });

    this.edytujProfilUzytkownikaForm = new FormGroup({
      haslo: this.haslo,
      phaslo: this.phaslo,
      email: new FormControl('', Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')),
      imie: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
      nazwisko: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
      dataUrodzenia: new FormControl(new Date()),
      wojewodztwo: new FormControl(),
      miejscowosc: new FormControl(),
      ulica: new FormControl(),
      numerTelefonu: new FormControl('', Validators.pattern('^[0-9\\-\\+]{9,15}$'))
    });
  }

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
