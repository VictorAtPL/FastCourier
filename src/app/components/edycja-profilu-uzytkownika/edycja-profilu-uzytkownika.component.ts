import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';
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

  constructor(private autentykacjaService: UwierzytelnianieService, private uzytkownikService: UzytkownikService,
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
      email: new FormControl(),
      imie: new FormControl(),
      nazwisko: new FormControl(),
      dataUrodzenia: new FormControl(),
      wojewodztwo: new FormControl(),
      miejscowosc: new FormControl(),
      ulica: new FormControl(),
      numerTelefonu: new FormControl()
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
