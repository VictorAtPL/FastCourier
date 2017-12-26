import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutentykacjaService} from '../../services/autentykacja.service';
import {UzytkownikService} from "../../services/uzytkownik.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private autentykacjaService: AutentykacjaService, private uzytkownikService: UzytkownikService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.autentykacjaService.czyZalogowany().subscribe((uzytkownik: any) => {
      if (uzytkownik != null) {
        uzytkownik.dataUrodzenia = new Date(uzytkownik.dataUrodzenia);
        this.zalogowanyUzytkownik = uzytkownik;
      }
    });

    this.edytujProfilUzytkownikaForm = new FormGroup({
      haslo: new FormControl(),
      email: new FormControl('', Validators.pattern('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')),
      imie: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
      nazwisko: new FormControl('', Validators.pattern('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$')),
      dataUrodzenia: new FormControl('', Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[.-](0?[1-9]|1[012])[.-]\\d{4}$')),
      wojewodztwo: new FormControl(),
      miejscowosc: new FormControl(),
      ulica: new FormControl(),
      numerTelefonu: new FormControl('', Validators.pattern('^[0-9\\-\\+]{9,15}$'))
    });
  }

  edytujProfilUzytkownika(data: any) {
    for (const key in data) {
      if (data[key] == null) {
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
}
