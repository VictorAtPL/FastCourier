import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {PowiadomieniaService} from '../../services/powiadomienia.service';
import {TypPowiadomienia} from "../../enums/typ-powiadomienia";

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
              private uzytkownikService: UzytkownikService,
              private snackBar: MatSnackBar,
              private router: Router,
              private uwierzytelnianieService: UwierzytelnianieService,
              private powiadomienieService: PowiadomieniaService) {
  }

  ngOnInit() {
    this.uwierzytelnianieService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });

    this.zlecanieTransportuForm = new FormGroup({
      kategoriaPaczki: new FormControl('', [Validators.required]),
      rozmiarPaczki: new FormControl('', [Validators.required]),
      wagaPaczki: new FormControl(''),
      komentarz: new FormControl('', [Validators.maxLength(200)]),
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.ofertaService.getOferta(this.id).subscribe(oferta => {
        this.oferta = oferta;
        this.oferta.rozmiaryPaczek = oferta.rozmiaryPaczek.split(',');
        this.oferta.kategoriePaczek = oferta.kategoriePaczek.split(',');
        this.zlecanieTransportuForm.controls['wagaPaczki'].setValidators([Validators.required, Validators.pattern(/^([1-9]|[0-9]{2,})$/), this.czyWagaMniejszaodMaksymalnejWagi(this.oferta.maksymalnaWagaPaczki)]);

      }, () => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy oferta o podanym id istnieje.', null, {
          duration: 2000,
        });
      });
    });


  }

  czyWagaMniejszaodMaksymalnejWagi(maksymalnaWagaPaczki) {
    return (input: FormControl) => {
      if (!maksymalnaWagaPaczki) {
        return null;
      }
      const czyMniejszaOdMaksymalnejWagi = parseFloat(input.value) <= parseFloat(maksymalnaWagaPaczki);
      return czyMniejszaOdMaksymalnejWagi ? null : {czyMniejszaOdMaksymalnejWagi: true};
    };
  }

  zlec() {
    const data = this.zlecanieTransportuForm.value;

    this.ofertaService.postZlecenieTransportu(data).subscribe((result) => {
      this.ofertaService.getOferta(this.id).subscribe((oferta) => {
        this.ofertaService.putDotyczyOfertyZlecenieTransportu(result._links.oferta.href, oferta._links.self.href).subscribe((result2) => {
          this.uzytkownikService.getUzytkownik(this.zalogowanyUzytkownik.login).subscribe((uzytkownik) => {
            this.ofertaService.putZlecajacyUzytkownikZlecenieTransportu(result._links.uzytkownik.href, uzytkownik._links.self.href).subscribe((result3) => {
              const refSnackBar = this.snackBar.open('Zlecono tansport przesyłki. Poczekaj na kontakt ze strony kierowcy.', null, {
                duration: 2000,
              });

              refSnackBar.afterDismissed().subscribe(() => {
                this.zlecanieTransportuForm.reset();
              });
            });

            const self = result._links.self.href;
            console.log(self);
            const self_a = self.split('/');
            const id = self_a[self_a.length - 1];

            this.powiadomienieService.postPowiadomienie({
              typPowiadomienia: TypPowiadomienia.ZLECONO_TRANSPORT_PRZESYLKI,
              idTypuPowiadomienia: id,
            }).subscribe((powiadomienie) => {
              this.powiadomienieService.putPowiadomienieUzytkownikaPowiadomienie(powiadomienie._links.uzytkownik, uzytkownik._links.self.href);
            });
          });
        });
      });
    });
  }
}
