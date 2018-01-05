import {Component, OnInit} from '@angular/core';
import {UwierzytelnianieService} from "../../services/uwierzytelnianie.service";
import {OfertaService} from "../../services/oferta.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MatTableDataSource} from "@angular/material";
import {Oferta} from "../../entities/Oferta.entity";
import {DataSource} from "@angular/cdk/collections";

/**
 * Logika biznesowa dla strony głównej, na której jest formularz wyszukiwania
 */
@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent implements OnInit {
  zalogowanyUzytkownik = {};

  miejscowosciFetchUrl: string;

  wyszukiwanieOfertForm: FormGroup;

  pokazWyniki = false;

  /**
   * Lista kolumn, które mają być wyświetlone w tabeli.
   * @type {[string , string , string , string , string , string , string]}
   */
  displayedColumns = ['dataGodzina', 'tytul', 'cena', 'kategoriePaczek', 'rozmiaryPaczek'];
  /**
   * Źródło danych dla komponentu tabeli.
   */
  dataSource: DataSource<Oferta>;
  /**
   * Tablica z ofertami pobranymi z serwisu REST.
   * @type {Array}
   */
  data: Oferta[] = [];

  /**
   * Konstruktor wstrzykujący usługi z których można potem korzystać w komponencie.
   * @param {OfertaService} ofertaService Komponent dostępu do ofert przez REST.
   */
  constructor(private autentykacjaService: UwierzytelnianieService,
              private ofertaService: OfertaService,
              private datePipe: DatePipe) {
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });
  }

  ngOnInit() {
    this.miejscowosciFetchUrl = this.ofertaService.getMiejscowosciFetchUrl();

    this.wyszukiwanieOfertForm = new FormGroup({
      miastoPoczatkowe: new FormControl('', [Validators.required]),
      miastoDocelowe: new FormControl('', [Validators.required]),
      dataWyjazdu: new FormControl(null)
    });
  }

  szukaj() {
    this.pokazWyniki = true;

    this.ofertaService.getOferty().subscribe(result => {
      const oferty: any[] = result._embedded.ofertas;

      oferty.forEach(oferta => {
        const dataWyjazdu = new Date(new Date(oferta.dataWyjazdu).setHours(0, 0));
        console.log(dataWyjazdu, this.wyszukiwanieOfertForm.controls['dataWyjazdu'].value);

        const dataGodzinaWyjazdu = this.fetchDataGodzinaWyjazdu(oferta.dataWyjazdu, oferta.godzinaWyjazdu);
        if (oferta.aktywna && !oferta.zablokowana && dataGodzinaWyjazdu >= new Date()
          && (this.wyszukiwanieOfertForm.controls['miastoPoczatkowe'].value.length === 0 ||
            this.wyszukiwanieOfertForm.controls['miastoPoczatkowe'].value === oferta.miastoPoczatkowe)
          && (this.wyszukiwanieOfertForm.controls['miastoDocelowe'].value.length === 0 ||
            this.wyszukiwanieOfertForm.controls['miastoDocelowe'].value === oferta.miastoDocelowe)
          && (this.wyszukiwanieOfertForm.controls['dataWyjazdu'].value === null ||
            this.wyszukiwanieOfertForm.controls['dataWyjazdu'].value.toISOString() === dataWyjazdu.toISOString())
        ) {
          this.data.push({
            tytul: oferta.tytul,
            dataGodzinaWyjazdu: dataGodzinaWyjazdu,
            cenaMinimalna: oferta.cenaMinimalna,
            cenaMaksymalna: oferta.cenaMaksymalna,
            id: oferta.id,
            kategoriePaczek: oferta.kategoriePaczek.split(','),
            loginUzytkownika: oferta.ofertaUzytkownika[0].login,
            maksymalnaWagaPaczki: oferta.maksymalnaWagaPaczki,
            miastoDocelowe: oferta.miastoDocelowe,
            miastoPoczatkowe: oferta.miastoPoczatkowe,
            rozmiaryPaczek: oferta.rozmiaryPaczek.split(','),
            aktywna: oferta.aktywna,
            zablokowana: oferta.zablokowana,
            zleceniaTransportu: oferta.zleceniaTransportu
          });
        }
      });

      this.data.sort((a, b) => {
        if (a.dataGodzinaWyjazdu > b.dataGodzinaWyjazdu) {
          return 1;
        } else if (a.dataGodzinaWyjazdu === b.dataGodzinaWyjazdu) {
          return 0;
        } else {
          return -1;
        }
      });

      this.dataSource = new MatTableDataSource<Oferta>(this.data);
    });
  }

  powrot() {
    this.pokazWyniki = false;
    this.dataSource = null;
    this.data = [];
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
