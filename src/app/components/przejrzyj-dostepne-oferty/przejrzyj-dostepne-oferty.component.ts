import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../services/oferta.service';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

/**
 * Interfejs definiujacy obiekt oferta, który jest wyświetlany w tabeli podglądu ofert.
 * @author Piotr Podbielski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export interface Oferta {
  /**
   * Id oferty.
   */
  id: number;

  /**
   * Tytuł oferty.
   */
  tytul: string;

  /**
   * Miasto docelowe.
   */
  miastoDocelowe: string;

  /**
   * Cena maksymalna, której zażąda wystawiający.
   */
  cenaMaksymalna: number;

  /**
   * Login użytkownika wystawiającego ofertę.
   */
  loginUzytkownika: string;

  /**
   * Tablica z kategoriami paczek, które może przewieźć wystawiający.
   */
  kategoriePaczek: string[];

  /**
   * Tablica z rozmiarami paczek, które może przewieźć wystawiający.
   */
  rozmiaryPaczek: string[];

  /**
   * Maksymalna waga paczki, którą może przewieźć wystawiający.
   */
  maksymalnaWagaPaczki: null | number;

  /**
   * Miasto początkowe z którego wyjeżdza wystawiający.
   */
  miastoPoczatkowe: string;

  /**
   * Cena minimalna, której zażąda wystawiający.
   */
  cenaMinimalna: number;

  /**
   * Data i godzina wyjazdu wystawiającego.
   */
  dataGodzinaWyjazdu: Date;
}

/**
 * Definicja komponentu PrzejrzyjDostepneOferty, ktory odpowiada za wyswietlenie strony z tabela w ktorej znajduje sie lista ofert.
 * @author Piotr Podbielski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @license Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-przejrzyj-dostepne-oferty',
  templateUrl: './przejrzyj-dostepne-oferty.component.html',
  styleUrls: ['./przejrzyj-dostepne-oferty.component.css'],
  viewProviders: [OfertaService]
})
export class PrzejrzyjDostepneOfertyComponent implements OnInit {
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
  constructor(private ofertaService: OfertaService) {
  }

  /**
   * Funkcja wywoływana przy inicjalizacji komponentu (ładowaniu strony przejrzenia dostępnych ofert).
   */
  ngOnInit() {
    this.ofertaService.getOferty().subscribe(result => {
      const oferty: any[] = result._embedded.ofertas;

      oferty.forEach(oferta => {
        this.data.push({
          tytul: oferta.tytul,
          dataGodzinaWyjazdu: this.fetchDataGodzinaWyjazdu(oferta.dataWyjazdu, oferta.godzinaWyjazdu),
          cenaMinimalna: oferta.cenaMinimalna,
          cenaMaksymalna: oferta.cenaMaksymalna,
          id: oferta.id,
          kategoriePaczek: oferta.kategoriePaczek.split(','),
          loginUzytkownika: oferta.ofertaUzytkownika[0].login,
          maksymalnaWagaPaczki: oferta.maksymalnaWagaPaczki,
          miastoDocelowe: oferta.miastoDocelowe,
          miastoPoczatkowe: oferta.miastoPoczatkowe,
          rozmiaryPaczek: oferta.rozmiaryPaczek.split(','),
        });
      });

      this.dataSource = new MatTableDataSource<Oferta>(this.data);
    });
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
