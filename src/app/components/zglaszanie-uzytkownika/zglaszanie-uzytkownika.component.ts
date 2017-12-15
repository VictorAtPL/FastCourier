import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {ActivatedRoute} from '@angular/router';
import {AutentykacjaService} from '../../services/autentykacja.service';
import {FormControl, FormGroup} from "@angular/forms";

/**
 * Logika biznesowa dla komponentu zgłaszania użytkownika
 */
@Component({
  selector: 'app-zglaszanie-uzytkownika',
  templateUrl: './zglaszanie-uzytkownika.component.html',
  styleUrls: ['./zglaszanie-uzytkownika.component.css'],
  viewProviders: [UzytkownikService]
})
export class ZglaszanieUzytkownikaComponent implements OnInit, OnDestroy {
  login = '';
  zalogowanyUzytkownik: any;
  zglosUzytkownikaForm: FormGroup;
  public powody: any[] = [{value: 'Niecenzuralne treści'},
    {value: 'Niewywiązanie się z umowy'},
    {value: 'Kradzież'}];
  private sub: any;

  constructor(private route: ActivatedRoute, private uzytkownikService: UzytkownikService, private snackBar: MatSnackBar, private autentykacjaService: AutentykacjaService) {
  }

  ngOnInit(): void {
    this.zglosUzytkownikaForm = new FormGroup({
      'powod': new FormControl(),
      'tresc': new FormControl()
    });

    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });

    this.sub = this.route.params.subscribe(params => {
      this.login = params['login'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  zglos() {
    const data = {
      powod: this.zglosUzytkownikaForm.controls['powod'].value.value,
      tresc: this.zglosUzytkownikaForm.controls['tresc'].value
    };

    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    this.uzytkownikService.getUzytkownik(this.login).subscribe(uzytkownik => {
      const uzytkownikUrl = uzytkownik._links.self.href;

      this.uzytkownikService.postZgloszenieUzytkownika(data).subscribe(zgloszenieUzytkownikow => {
        const zgloszonyUzytkownikZgloszenieUzytkownikowUrl = zgloszenieUzytkownikow._links.uzytkownik.href;

        this.uzytkownikService.putZgloszonyUzytkownikZgloszenieUzytkownikow(zgloszonyUzytkownikZgloszenieUzytkownikowUrl, uzytkownikUrl)
          .subscribe(result => {
              this.zglosUzytkownikaForm.reset();
              this.snackBar.open('Zgłoszono użytkownika. Dziękujemy.', null, {
                duration: 2000,
              });
            },
            wyswietlBlad);
      }, wyswietlBlad);
    }, wyswietlBlad);
  }
}
