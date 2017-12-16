import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {OfertaService} from "../../services/oferta.service";

/**
 * Logika biznesowa dla komponentu zgłaszania oferty
 */
@Component({
  selector: 'app-zglaszanie-oferty',
  templateUrl: './zglaszanie-oferty.component.html',
  styleUrls: ['./zglaszanie-oferty.component.css'],
  viewProviders: [OfertaService]
})
export class ZglaszanieOfertyComponent implements OnInit, OnDestroy {
  oferta: any;
  id: number;
  zglosOferteForm: FormGroup;
  public powody: any[] = [{value: 'Błędny opis oferty'},
    {value: 'Oferta narusza zasady'},
    {value: 'Inne'}];
  private sub: any;

  constructor(private route: ActivatedRoute, private ofertaService: OfertaService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.zglosOferteForm = new FormGroup({
      'powod': new FormControl(),
      'tresc': new FormControl()
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.ofertaService.getOferta(this.id).subscribe(oferta => {
      this.oferta = oferta;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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
