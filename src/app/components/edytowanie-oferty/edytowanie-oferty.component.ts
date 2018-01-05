import {Component, OnInit} from '@angular/core';
import {OfertaService} from "../../services/oferta.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatSnackBar} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomValidators} from "ng2-validation";

/**
 * Logika biznesowa dla komponentu edycji oferty
 */
@Component({
  selector: 'app-edytowanie-oferty',
  templateUrl: './edytowanie-oferty.component.html',
  styleUrls: ['./edytowanie-oferty.component.css'],
  viewProviders: [OfertaService]
})
export class EdytowanieOfertyComponent implements OnInit {

  /**
   * Zmienna przechowująca numer oferty
   */
  id: number;

  /**
   * Formatka do wpisywania ceny minimalnej
   */
  cenaMinimalna: FormControl;

  /**
   * Formatka do wpisywania ceny maksymalnej
   */
  cenaMaksymalna: FormControl;

  /**
   * Grupa formatek dotyczących dodawania oferty
   */
  edytowanieOfertyForm: FormGroup;

  /**
   * Formatka do wybierania kategorii paczek
   * @type {[string , string , string , string , string , string]}
   */
  kategoriePaczek: string[] = [
    'żywność',
    'szkło',
    'zwierzęta',
    'elektronika',
    'rośliny',
    'sztuka'
  ];

  /**
   * Formatka do wybierania rozmiarów paczek
   * @type {[string , string , string]}
   */
  rozmiaryPaczek: string[] = [
    'mała',
    'średnia',
    'duża'
  ];
  oferta: any;
  private sub: any;

  miejscowosciFetchUrl: string;

  /**
   * Konstruktor komponentu wstrzykujący serwisy, które mogą być wykorzystane w klasie
   * @param {DatePipe} datePipe
   */
  constructor(private datePipe: DatePipe,
              private ofertaService: OfertaService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) {
  }

  /**
   * Funkcja inicjalizująca formularz dodawania oferty i ładująca aktualnie zalogowanego użytkownika
   */
  ngOnInit() {
    this.miejscowosciFetchUrl = this.ofertaService.getMiejscowosciFetchUrl();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.ofertaService.getOferta(this.id).subscribe(oferta => {
        this.oferta = oferta;
        this.oferta.rozmiaryPaczek = oferta.rozmiaryPaczek.split(',');
        this.oferta.kategoriePaczek = oferta.kategoriePaczek.split(',');
        this.oferta.dataGodzinaWyjazdu = this.fetchDataGodzinaWyjazdu(oferta.dataWyjazdu, oferta.godzinaWyjazdu);
        this.oferta.zleceniaTransportu = [];

        if ('zleceniaTransportu' in oferta._embedded) {
          this.oferta.zleceniaTransportu = oferta._embedded.zleceniaTransportu;
        }

        this.edytowanieOfertyForm.controls['tytul'].setValue(this.oferta.tytul);
        this.edytowanieOfertyForm.controls['rozmiaryPaczek'].setValue(this.oferta.rozmiaryPaczek);
        this.edytowanieOfertyForm.controls['kategoriePaczek'].setValue(this.oferta.kategoriePaczek);
        this.edytowanieOfertyForm.controls['cenaMinimalna'].setValue(this.oferta.cenaMinimalna);
        this.edytowanieOfertyForm.controls['cenaMaksymalna'].setValue(this.oferta.cenaMaksymalna);
        this.edytowanieOfertyForm.controls['miastoPoczatkowe'].setValue(oferta.miastoPoczatkowe);
        this.edytowanieOfertyForm.controls['miastoDocelowe'].setValue(oferta.miastoDocelowe);
        this.edytowanieOfertyForm.controls['dataWyjazdu'].setValue(this.oferta.dataGodzinaWyjazdu);
        this.edytowanieOfertyForm.controls['godzinaWyjazdu'].setValue(this.datePipe.transform(oferta.dataGodzinaWyjazdu, 'HH:mm'));
        this.edytowanieOfertyForm.controls['opis'].setValue(this.oferta.opis);
        this.edytowanieOfertyForm.updateValueAndValidity();

      }, () => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy użytkownik o podanym loginie istnieje.', null, {
          duration: 2000,
        });
      });
    });

    this.cenaMinimalna = new FormControl('15');
    this.cenaMaksymalna = new FormControl('15', [Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyWiekszaRownaOdCenyMinimalnej(this.cenaMinimalna)]);

    this.cenaMinimalna.setValidators([Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyMniejszaRownaOdCenyMaksymalnej(this.cenaMaksymalna)]);

    this.edytowanieOfertyForm = new FormGroup({
      tytul: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
      cenaMinimalna: this.cenaMinimalna,
      cenaMaksymalna: this.cenaMaksymalna,
      miastoPoczatkowe: new FormControl('', [Validators.required]),
      miastoDocelowe: new FormControl('', [Validators.required]),
      kategoriePaczek: new FormControl('', [Validators.required]),
      rozmiaryPaczek: new FormControl('', [Validators.required]),
      maksymalnaWagaPaczki: new FormControl('', [Validators.pattern(/^(|[1-9]|[0-9]{2,})$/)]),
      // TODO: Zbadać problem przy wpisywaniu daty ręcznie
      dataWyjazdu: new FormControl(null, [Validators.required]),
      godzinaWyjazdu: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{2}:[0-9]{2}$/)]),
      opis: new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(200)])
    });
  }

  /**
   * Walidator sprawdzający czy cena maksymalna jest większa bądź równa od ceny minimalnej
   * @param {FormControl} cenaMinimalna
   * @returns {(input: FormControl) => {czyMniejszaOdCenyMinimalnej: boolean}}
   */
  czyWiekszaRownaOdCenyMinimalnej(cenaMinimalna: FormControl) {
    return (input: FormControl) => {
      const czyWiekszaRownaOdCenyMinimalnej = parseFloat(input.value) >= parseFloat(cenaMinimalna.value);
      return czyWiekszaRownaOdCenyMinimalnej ? null : {czyMniejszaOdCenyMinimalnej: true};
    };
  }

  /**
   * Walidator sprawdzający czy cena minimalna jest mniejsza bądź równa od ceny maksymalnej
   * @param {FormControl} cenaMaksymalna
   * @returns {(input: FormControl) => {czyWiekszaOdCenyMaksymalnej: boolean}}
   */
  czyMniejszaRownaOdCenyMaksymalnej(cenaMaksymalna: FormControl) {
    return (input: FormControl) => {
      const czyMniejszaRownaOdCenyMaksymalnej = parseFloat(input.value) <= parseFloat(cenaMaksymalna.value);
      return czyMniejszaRownaOdCenyMaksymalnej ? null : {czyWiekszaOdCenyMaksymalnej: true};
    };
  }

  /**
   * Funkcja uruchamiająca walidację kontrolki ceny maksymalnej
   */
  weryfikujCeneMaksymalna() {
    this.edytowanieOfertyForm.controls['cenaMaksymalna'].updateValueAndValidity();
  }

  /**
   * Funkcja uruchamiająca walidację kontrolki ceny minimalnej
   */
  weryfikujCeneMinimalna() {
    this.edytowanieOfertyForm.controls['cenaMinimalna'].updateValueAndValidity();
  }

  edytuj() {
    const data = this.edytowanieOfertyForm.value;

    const dataGodzinaWyjazdu = new Date(data.dataWyjazdu);
    const godzina_a = data.godzinaWyjazdu.split(':');
    dataGodzinaWyjazdu.setHours(Number(godzina_a[0]));
    dataGodzinaWyjazdu.setMinutes(Number(godzina_a[1]));

    data.dataWyjazdu = data.godzinaWyjazdu = dataGodzinaWyjazdu.toISOString();

    data.kategoriePaczek = data.kategoriePaczek.join(',');
    data.rozmiaryPaczek = data.rozmiaryPaczek.join(',');

    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    this.ofertaService.patchOferta(this.id, data).subscribe(oferta => {
      const refSnackBar = this.snackBar.open('Zaktualizowano ofertę. Za chwile nastąpi przekierowanie.', null, {
        duration: 2000,
      });

      refSnackBar.afterDismissed().subscribe(() => {
        this.router.navigate(['/oferta/wyswietl', this.id]);
      });
    }, wyswietlBlad);
  }

  /**
   * Funkcja konwertująca ciągi znaków daty wyjazdu i godziny wyjazdu w obiekt JavaScript typu Date
   * @param {string} dataWyjazdu
   * @param {string} godzinaWyjazdu
   * @returns {Date}
   */
  private fetchDataGodzinaWyjazdu(dataWyjazdu: string, godzinaWyjazdu: string): Date {
    const godzinaWyjazdu_a = godzinaWyjazdu.split(':');
    return new Date(new Date(dataWyjazdu).setHours(Number(godzinaWyjazdu_a[0]), Number(godzinaWyjazdu_a[1]), 0));
  }
}
