import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {UwagaService} from '../../services/uwaga.service';
import {MatTableDataSource} from '@angular/material/table';

export interface Uwaga {
  powod;
  tresc;
}

@Component({
  selector: 'app-przejrzyj-uwagi',
  templateUrl: './przejrzyj-uwagi.component.html',
  styleUrls: ['./przejrzyj-uwagi.component.css'],
  viewProviders: [UwagaService]
})

/**
 * Klasa odpwiedzialna za pobieranie obiektów przechowujacych dane zglasznych uwag
 * @author Michał Świerczewski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 *
 */
export class PrzejrzyjUwagiComponent implements OnInit {
  /**
   *  Ustawienienie wartości w tablicy displayedColumns gdzie w pierwszym polu znajduje się powód a w drugim treść
   * @type {[string , string]}
   */
  displayedColumns = ['powod', 'tresc'];
  /**
   * Pobranie danych z Uwagi
   */
  dataSource: DataSource<Uwaga>;

  /**
   * Konstruktor tworzący obiekt klasy PrzejrzyjUwagiComponent
   * @param {UwagaService} uwagaService
   */
  constructor(private uwagaService: UwagaService) {
  }

  /**
   * Pobiera dane z Rest
   */
  ngOnInit() {
    const data: Uwaga[] = [];

    this.uwagaService.getUwagi().subscribe(result => {
      const uwagi = result._embedded.uwagas;
      uwagi.forEach((uwaga, index) => {
        data.push({
          powod: uwaga.powod, tresc: uwaga.tresc
        });
      });
      this.dataSource = new MatTableDataSource<Uwaga>(data);
    });
  }

}
