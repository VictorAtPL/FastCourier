import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';

@Component({
  selector: 'app-zlecanie-transportu-przesylki',
  templateUrl: './zlecanie-transportu-przesylki.component.html',
  styleUrls: ['./zlecanie-transportu-przesylki.component.css']
})
export class ZlecanieTransportuPrzesylkiComponent implements OnInit {

  /**
   * Zmienna przechowująca numer oferty
   */
  id: number;

  /**
   * Obiekt przechowujący atrybuty oferty.
   * @type {{}}
   */
  oferta: any;
  zlecanieTransportuForm: FormGroup;
  zalogowanyUzytkownik: any;
  /**
   * Obiekt przechowujący inny obiekt, który będziemy obserwować. Zawiera on stan parametrów URL aktualnie przeglądanej strony.
   */
  private sub: any;

  constructor(private route: ActivatedRoute,
              private ofertaService: OfertaService,
              private snackBar: MatSnackBar,
              private router: Router,
              private uwierzytelnianieService: UwierzytelnianieService) {
  }

  ngOnInit() {
    this.uwierzytelnianieService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });

    this.zlecanieTransportuForm = new FormGroup({
      kategoriaPaczki: new FormControl('', [Validators.required]),
      rozmiarPaczki: new FormControl('', [Validators.required]),
      wagaPaczki: new FormControl('', [Validators.required, Validators.pattern(/^([1-9]|[0-9]{2,})$/)]),
      komentarz: new FormControl('', [Validators.maxLength(200)]),
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.ofertaService.getOferta(this.id).subscribe(oferta => {
        this.oferta = oferta;
        this.oferta.rozmiaryPaczek = oferta.rozmiaryPaczek.split(',');
        this.oferta.kategoriePaczek = oferta.kategoriePaczek.split(',');
        this.zlecanieTransportuForm.controls['wagaPaczki'].setValidators(this.czyWagaMniejszaodMaksymalnejWagi(this.oferta.maksymalnaWagaPaczki));

      }, () => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy oferta o podanym id istnieje.', null, {
          duration: 2000,
        });
      });
    });


  }

  czyWagaMniejszaodMaksymalnejWagi(maksymalnaWagaPaczki) {
    return (input: FormControl) => {
      const czyMniejszaOdMaksymalnejWagi = parseFloat(input.value) <= parseFloat(maksymalnaWagaPaczki);
      return czyMniejszaOdMaksymalnejWagi ? null : {czyMniejszaOdMaksymalnejWagi: true};
    };
  }

  zlec() {
  }
}
