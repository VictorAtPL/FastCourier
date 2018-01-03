import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UzytkownikService} from "../../services/uzytkownik.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

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
  rejestracjaForm: FormGroup;

  constructor(private uzytkownikService: UzytkownikService, private router: Router, public snackBar: MatSnackBar) {
  }

  /**
   * Metoda wywoływana przy próbie załadowania formularza. Ustawia parametry walidatorów.
   */
  ngOnInit(): void {
    this.rejestracjaForm = new FormGroup({
      login: new FormControl(),
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
