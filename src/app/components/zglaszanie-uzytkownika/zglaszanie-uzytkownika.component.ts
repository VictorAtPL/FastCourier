import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {ActivatedRoute} from '@angular/router';
import {AutentykacjaService} from '../../services/autentykacja.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

/**
 * Logika biznesowa dla komponentu zgłaszania użytkownika
 * @author Marcin M.
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
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

  /**
   * Zdefiniowanie typów powodów zgłoszenia
   * @type {{value: string}[]} treść powodu zgłoszenia
   */
  public powody: any[] = [{value: 'Niecenzuralne treści'},
    {value: 'Niewywiązanie się z umowy'},
    {value: 'Kradzież'}];
  private sub: any;

  constructor(private route: ActivatedRoute, private uzytkownikService: UzytkownikService, private snackBar: MatSnackBar, private autentykacjaService: AutentykacjaService) {
  }

  /**
   * Funkcja inicjalizująca formularz zgłaszania użytkownika i  ładująca aktualnie zalogowanego użytkownika
   */
  ngOnInit(): void {
    this.zglosUzytkownikaForm = new FormGroup({
      'powod': new FormControl([Validators.required]),
      'tresc': new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(500)])
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

  /**
   * Metoda obsługująca proces zgłaszania użytkownika
   */
  zglos() {
    const data = {
      powod: this.zglosUzytkownikaForm.controls['powod'].value.value,
      tresc: this.zglosUzytkownikaForm.controls['tresc'].value
    };

    /**
     * Zdefiniowanie wiadomości błędu
     */
    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    /**
     * Wczytanie danych użytkownika
     */
    this.uzytkownikService.getUzytkownik(this.login).subscribe(uzytkownik => {
      const uzytkownikUrl = uzytkownik._links.self.href;

      /**
       * Zgłoszenie użytkownika
       */
      this.uzytkownikService.postZgloszenieUzytkownika(data).subscribe(zgloszenieUzytkownikow => {
        const zgloszonyUzytkownikZgloszenieUzytkownikowUrl = zgloszenieUzytkownikow._links.uzytkownik.href;

        /**
         * Zapisanie zgłoszenia użytkownika
         */
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
