import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {CustomValidators} from 'ng2-validation';
import {OfertaService} from '../../services/oferta.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AutentykacjaService} from '../../services/autentykacja.service';

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
export class DodawanieOfertyComponent implements OnInit {
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
   * Funkcja inicjalizująca formularz dodawania oferty i ładująca aktualnie zalogowanego użytkownika
   */
  ngOnInit() {
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

    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
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

    const wyswietlBlad = (x) => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    };

    this.ofertaService.postOferta(data).subscribe(oferta => {
      const uzytkownikUrl = this.zalogowanyUzytkownik._links.self.href;

      this.ofertaService.postUzytkownikOfertyOferta(oferta._links.uzytkownik.href, uzytkownikUrl).subscribe(result2 => {
        const refSnackBar = this.snackBar.open('Dodano ofertę. Za chwile nastąpi przekierowanie.', null, {
          duration: 2000,
        });

        const selfUrl_a = result2._links.self.href.split('/');
        const id = selfUrl_a[selfUrl_a.length - 1];

        refSnackBar.afterDismissed().subscribe(() => {
          this.router.navigate(['/oferta/wyswietl', id]);
        });
      }, wyswietlBlad);
    }, wyswietlBlad);
  }
}
