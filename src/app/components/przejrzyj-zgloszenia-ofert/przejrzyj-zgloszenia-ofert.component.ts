import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from "@angular/cdk/collections";
import {OfertaService} from "../../services/oferta.service";

export interface ZgloszonaOferta {
  id: number;
  tytul: string;
}

export interface ZgloszenieOferty {
  powod,
  tresc,
  zgloszonaOferta: ZgloszonaOferta
}

@Component({
  selector: 'app-przejrzyj-zgloszenia-ofert',
  templateUrl: './przejrzyj-zgloszenia-ofert.component.html',
  styleUrls: ['./przejrzyj-zgloszenia-ofert.component.css'],
  viewProviders: [OfertaService]
})

/**
 * Klasa odpowiedzialna za przeglądanie zgłaszonych ofert
 * @author Michał Pruchniewski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */

export class PrzejrzyjZgloszeniaOfertComponent implements OnInit {

  /**
   * Ustawienie wartości w tablicy wyświetlanych kolumn displayedColumns
   * @type {[string , string , string]}
   */
  displayedColumns = ['zgloszonaOferta', 'powod', 'tresc'];

  /**
   * Pobranie danych ze Zgloszenia oferty
   */
  dataSource: DataSource<ZgloszenieOferty>;

  /**
   * Konstruktor tworzący obiekt klasy PrzejrzyjZgloszeniaOfertyComponent
   * @param {OfertaService} ofertaService
   */
  constructor(private ofertaService: OfertaService) {
  }

  /**
   * Pobranie danych z Rest
   */
  ngOnInit() {
    const data: ZgloszenieOferty[] = [];

    this.ofertaService.getZgloszeniaOfert().subscribe(result => {
      const zgloszeniaUzytkownikow = result._embedded.zgloszenieOferties;
      zgloszeniaUzytkownikow.forEach((zgloszenieOferty, index) => {
        data.push({
          powod: zgloszenieOferty.powod, tresc: zgloszenieOferty.tresc,
          zgloszonaOferta: {
            id: zgloszenieOferty.zgloszonaOferta[0].id,
            tytul: zgloszenieOferty.zgloszonaOferta[0].tytul
          }
        });
      });
      this.dataSource = new MatTableDataSource<ZgloszenieOferty>(data);
    });
  }

}
