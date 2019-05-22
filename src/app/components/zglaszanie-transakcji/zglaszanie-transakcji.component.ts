import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {TransakcjaService} from "../../services/transakcja.service";

/**
 * Logika biznesowa dla komponentu zgłaszania transakcji
 */
@Component({
  selector: 'app-zglaszanie-transakcji',
  templateUrl: './zglaszanie-transakcji.component.html',
  styleUrls: ['./zglaszanie-transakcji.component.css'],
  viewProviders: [TransakcjaService]
})
export class ZglaszanieTransakcjiComponent implements OnInit, OnDestroy {
  selected: String;
  /**
   * Atrybut przechowywujący transakcje której dotyczy zgłoszenie
   */
  transakcja: any;

  /**
   * Atrybit przechowywujący numer zgłoszenia
   */
  id: number;

  /**
   * Atrybut przechowywujący zgrupowane transakcje
   */
  zglosTransakcjeForm: FormGroup;

  private sub: any;

  constructor(private route: ActivatedRoute, private transakcjaService: TransakcjaService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.zglosTransakcjeForm = new FormGroup({
      'powod': new FormControl('', [Validators.required]),
      'tresc': new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(500)])
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.transakcjaService.getTransakcja(this.id).subscribe(transakcja => {
      this.transakcja = transakcja;
    });
  }

  /**
   * Metoda wykonywana podczas wychodzenia z danej strony
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Metoda zgłaszająca transakcję
   */
  zglos() {
    const data = {
      powod: this.zglosTransakcjeForm.controls['powod'].value.value,
      tresc: this.zglosTransakcjeForm.controls['tresc'].value
    };

    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    const transakcjaUrl = this.transakcja._links.self.href;

    this.transakcjaService.postZgloszenieTransakcji(data).subscribe(zgloszenieTransakcji => {
      const zgloszonaTransakcjaZgloszenieTransakcjiUrl = zgloszenieTransakcji._links.transakcja.href;

      this.transakcjaService.putZgloszonaTransakcjaZgloszenieTransakcji(zgloszonaTransakcjaZgloszenieTransakcjiUrl, transakcjaUrl)
        .subscribe(result => {
            this.zglosTransakcjeForm.reset();
            this.snackBar.open('Zgłoszono transakcję. Dziękujemy.', null, {
              duration: 2000,
            });
          },
          wyswietlBlad);
    }, wyswietlBlad);
  }
}
