import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';
import {UzytkownikService} from "../../services/uzytkownik.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  /**
   * Metoda odpowiedzialna za edycje danych użytkownika.
   * @param data
   */
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
