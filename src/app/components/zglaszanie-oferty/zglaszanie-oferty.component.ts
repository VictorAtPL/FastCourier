import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';

/**
 * Logika biznesowa dla komponentu zgłaszania oferty
 */
@Component({
  selector: 'app-zglaszanie-oferty',
  templateUrl: './zglaszanie-oferty.component.html',
  styleUrls: ['./zglaszanie-oferty.component.css'],
  viewProviders: [OfertaService]
})

/**
 * Klasa odpowiedzialna za zgłaszanie ofert
 * @author Michał Pruchniewski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export class ZglaszanieOfertyComponent implements OnInit, OnDestroy {

  /**
   * Atrybut przechowywujący ofertę której dotyczy zgłoszenie
   */
  oferta: any;

  /**
   * Atrybit przechowywujący numer zgłoszenia
   */
  id: number;

  /**
   * Atrybut przechowywujący zgrupowane oferty
   */
  zglosOferteForm: FormGroup;

  /**
   * Tablica przechowywująca możliwe powody zgłoszenia oferty
   * @type {[{value: string} , {value: string} , {value: string}]}
   */
  public powody: any[] = [{value: 'Błędny opis oferty'},
    {value: 'Oferta narusza zasady'},
    {value: 'Inne'}];

  /**
   * Obiekt do którego przypisywany jest obserwowany obiekt
   */
  private sub: any;

  /**
   * Konstruktor klasy ZglaszanieOfertyComponent
   * @param {} route
   * @param {OfertaService} ofertaService
   * @param {} snackBar
   */
  constructor(private route: ActivatedRoute, private ofertaService: OfertaService, private snackBar: MatSnackBar) {
  }

  /**
   * Metoda pobierająca dane z Rest
   */
  ngOnInit() {
    this.zglosOferteForm = new FormGroup({
      'powod': new FormControl('', [Validators.required]),
      'tresc': new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(500)])
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.ofertaService.getOferta(this.id).subscribe(oferta => {
      this.oferta = oferta;
    });
  }

  /**
   * Metoda wykonywana podczas wychodzenia z danej strony
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Metoda zgłaszająca ofertę
   */
  zglos() {
    const data = {
      powod: this.zglosOferteForm.controls['powod'].value.value,
      tresc: this.zglosOferteForm.controls['tresc'].value
    };

    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    const ofertaUrl = this.oferta._links.self.href;

    this.ofertaService.postZgloszenieOferty(data).subscribe(zgloszenieOfert => {
      const zgloszonaOfertaZgloszenieOfertUrl = zgloszenieOfert._links.oferta.href;

      this.ofertaService.putZgloszonaOfertaZgloszenieOfert(zgloszonaOfertaZgloszenieOfertUrl, ofertaUrl)
        .subscribe(result => {
            this.zglosOferteForm.reset();
            this.snackBar.open('Zgłoszono uwagę. Dziękujemy.', null, {
              duration: 2000,
            });
          },
          wyswietlBlad);
    }, wyswietlBlad);
  }
}
