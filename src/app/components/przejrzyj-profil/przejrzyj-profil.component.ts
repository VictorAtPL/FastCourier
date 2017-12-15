import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UzytkownikService} from "../../services/uzytkownik.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-przejrzyj-profil',
  templateUrl: './przejrzyj-profil.component.html',
  styleUrls: ['./przejrzyj-profil.component.css'],
  viewProviders: [UzytkownikService]
})
export class PrzejrzyjProfilComponent implements OnInit, OnDestroy {
  login: string;
  uzytkownik: any = {};
  private sub: any;

  constructor(private route: ActivatedRoute, private uzytkownikService: UzytkownikService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.login = params['login'];

      this.uzytkownikService.getUzytkownik(this.login).subscribe(uzytkownik => {
        this.uzytkownik = uzytkownik;
      }, error2 => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy użytkownik o podanym loginie istnieje.', null, {
          duration: 2000,
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
