import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {CustomValidators} from 'ng2-validation';
import {OfertaService} from '../../services/oferta.service';
import {MatSnackBar} from '@angular/material';

/**
 * Logika biznesowa dla komponentu dodawania oferty
 * @author Piotr Podbielski
 * @since 0.0.2
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-dodawanie-oferty',
  templateUrl: './dodawanie-oferty.component.html',
  styleUrls: ['./dodawanie-oferty.component.css'],
  viewProviders: [OfertaService]
})
export class DodawanieOfertyComponent {
  /**
   * Formatka do wpisywania ceny minimalnej
   */
  cenaMinimalna: FormControl;
  /**
   * Formatka do wpisywania ceny maksymalnej
   */
  cenaMaksymalna: FormControl;
  /**
   * Grupa formatek dotyczacych dodawania oferty
   */
  dodawanieOfertyForm: FormGroup;

  kategoriePaczek: string[] = [
    'żywność',
    'szkło',
    'zwierzęta',
    'elektronika',
    'rośliny',
    'sztuka'
  ];

  rozmiaryPaczek: string[] = [
    'mała',
    'średnia',
    'duża'
  ];

  /**
   * Konstruktor komponentu inicjalizujący grupę formatek
   * @param {DatePipe} datePipe
   */
  constructor(private datePipe: DatePipe, private ofertaService: OfertaService, private snackBar: MatSnackBar) {
    this.cenaMinimalna = new FormControl('15');
    this.cenaMaksymalna = new FormControl('15', [Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyWiekszaRownaOdCenyMinimalnej(this.cenaMinimalna)]);

    this.cenaMinimalna.setValidators([Validators.required, Validators.min(0), CustomValidators.number,
      Validators.pattern(/^([^\\.]+|[0-9]+\.[0-9]{1,2})$/), this.czyMniejszaRownaOdCenyMaksymalnej(this.cenaMaksymalna)]);

    this.dodawanieOfertyForm = new FormGroup({
      tytul: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(40)]),
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
  }

  /**
   * Walidator sprawdzajacy czy cena maksymalna jest większa bądź równa od ceny minimalnej
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
   * Walidator sprawdzajacy czy cena minimalna jest mniejsza bądź równa od ceny maksymalnej
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
    this.dodawanieOfertyForm.controls['cenaMaksymalna'].updateValueAndValidity();
  }

  /**
   * Funkcja uruchamiająca walidację kontrolki ceny minimalnej
   */
  weryfikujCeneMinimalna() {
    this.dodawanieOfertyForm.controls['cenaMinimalna'].updateValueAndValidity();
  }

  wystaw() {
    const data = this.dodawanieOfertyForm.value;

    const dataGodzinaWyjazdu = new Date(this.dodawanieOfertyForm.controls['dataWyjazdu'].value);
    const godzina_a = data.godzinaWyjazdu.split(':');
    dataGodzinaWyjazdu.setHours(godzina_a[0]);
    dataGodzinaWyjazdu.setHours(godzina_a[1]);

    data.dataWyjazdu = data.godzinaWyjazdu = dataGodzinaWyjazdu.toISOString();

    data.kategoriePaczek = data.kategoriePaczek.join(',');
    data.rozmiaryPaczek = data.rozmiaryPaczek.join(',');

    this.ofertaService.postOferta(data).subscribe(result => {
      const refSnackBar = this.snackBar.open('Dodano ofertę. Za chwile nastąpi przekierowanie.', null, {
        duration: 2000,
      });

      console.log(result);

      // refSnackBar.afterDismissed().subscribe()
    }, error2 => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    });
  }
}
