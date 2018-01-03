import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AutentykacjaService} from "../../services/autentykacja.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

/**
 * Logika biznesowa dla komponentu logowania
 */
@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent {

  logowanieForm: FormGroup;

  constructor(private autentykacjaService: AutentykacjaService, private router: Router, public snackBar: MatSnackBar) {
    this.logowanieForm = new FormGroup({
      login: new FormControl('', [Validators.required , Validators.maxLength(30)] ),
      haslo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)])
    });
  }


  zaloguj() {
    this.autentykacjaService.weryfikuj(this.logowanieForm.controls['login'].value,
      this.logowanieForm.controls['haslo'].value).subscribe(uzytkownik => {
        if (uzytkownik && uzytkownik.haslo === this.logowanieForm.controls['haslo'].value) {
          this.autentykacjaService.zaloguj(this.logowanieForm.controls['login'].value, uzytkownik);
          const refSnackBar = this.snackBar.open('Zalogowano do systemu. Poczekaj chwilę.', null, {
            duration: 2000,
          });

          refSnackBar.afterDismissed().subscribe(next => {
            this.router.navigate(['']);
          });
        } else {
          this.snackBar.open('Hasło jest nie prawidłowe.', null, {
            duration: 2000,
          });
        }
      },
      err => {
        this.snackBar.open('Podane konto nie istnieje.', null, {
          duration: 2000,
        });
      });
  }
}
