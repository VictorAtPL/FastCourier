import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AutentykacjaService} from "../autentykacja.service";
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
      email: new FormControl(''),
      haslo: new FormControl('')
    });
  }


  zaloguj() {
    this.autentykacjaService.weryfikuj(this.logowanieForm.controls['email'].value, this.logowanieForm.controls['haslo'].value).subscribe(uzytkownik => {
        if (uzytkownik && uzytkownik.haslo === this.logowanieForm.controls['haslo'].value) {
          localStorage.setItem('zalogowanyUzytkownik', JSON.stringify(uzytkownik));
          this.router.navigate(['']);
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
