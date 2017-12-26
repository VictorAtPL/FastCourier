import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutentykacjaService} from '../../services/autentykacja.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';
import {DatePipe} from '@angular/common';
import {CustomValidators} from 'ng2-validation';

/**
 * Logika biznesowa dla komponentu edycji oferty
 */
@Component({
  selector: 'app-edytowanie-oferty',
  templateUrl: './edytowanie-oferty.component.html',
  styleUrls: ['./edytowanie-oferty.component.css']
})

export class EdytowanieOfertyComponent implements OnInit {
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

  /**
   * Zmienna przechowująca aktualnie zalogowanego użytkownika
   */
  zalogowanyUzytkownik: any;

  /**
   * Konstruktor komponentu wstrzykujący serwisy, które mogą być wykorzystane w klasie
   * @param {DatePipe} datePipe
   */
  constructor(private datePipe: DatePipe, private ofertaService: OfertaService,
              private snackBar: MatSnackBar, private router: Router,
              private autentykacjaService: AutentykacjaService) {
  }

  /**
   * Funkcja inicjalizująca formularz edytowania oferty i ładująca aktualnie zalogowanego użytkownika
   */
  ngOnInit() {
    this.cenaMinimalna = new FormControl('15');
    this.cenaMaksymalna = new FormControl('15', [Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyWiekszaRownaOdCenyMinimalnej(this.cenaMinimalna)]);

    this.cenaMinimalna.setValidators([Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyMniejszaRownaOdCenyMaksymalnej(this.cenaMaksymalna)]);

    this.edytowanieOfertyForm = new FormGroup({
      cenaMinimalna: this.cenaMinimalna,
      cenaMaksymalna: this.cenaMaksymalna,
      miastoPoczatkowe: new FormControl('', [Validators.required]),
      miastoDocelowe: new FormControl('', [Validators.required]),
      kategoriePaczek: new FormControl('', [Validators.required]),
      rozmiaryPaczek: new FormControl('', [Validators.required]),
      maksymalnaWagaPaczki: new FormControl('', [Validators.pattern(/^(|[1-9]|[0-9]{2,})$/)]),
      // TODO: Zbadać problem przy wpisywaniu daty ręcznie
      dataWyjazdu: new FormControl(new Date(), [Validators.required]),
      godzinaWyjazdu: new FormControl(this.datePipe.transform(new Date(), 'hh:mm'),
        [Validators.required, Validators.pattern(/^[0-9]{2}:[0-9]{2}$/)]),
      opis: new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(200)]),
      czyWyroznic: new FormControl(false, [Validators.required])
    });

    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
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
}
