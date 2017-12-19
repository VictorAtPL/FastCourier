import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../services/oferta.service';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {DataSource} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

export interface ZgloszonaOferta {
  id: number;
  tytul: string;
}

export interface ZgloszenieOferty {
  id: number;
  powod: string;
  tresc: string;
  zgloszonaOferta: ZgloszonaOferta;
  dataDodania: Date;
  przeczytane: boolean;
}

export interface ZgloszenieUzytkownika {
  id: number;
  powod: string;
  tresc: string;
  zgloszonyUzytkownik: string;
  dataDodania: Date;
  przeczytane: boolean;
}

/**
 * Klasa odpowiedzialna za przeglądanie zgłoszonych ofert oraz użytkowników
 * @author Michał Pruchniewski, Marcin Marcinkowski, Michał Świerczewski
 * @since 0.0.3
 * @version 0.0.4
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-przejrzyj-zgloszenia',
  templateUrl: './przejrzyj-zgloszenia.component.html',
  styleUrls: ['./przejrzyj-zgloszenia.component.css'],
  viewProviders: [OfertaService, UzytkownikService]
})
export class PrzejrzyjZgloszeniaComponent implements OnInit {

  /**
   * Pobranie danych ze Zgloszenia oferty
   */
  zgloszeniaOfertDataSource: DataSource<ZgloszenieOferty>;

  /**
   * Pobranie danych ze Zgloszenia uzytkownika
   */
  zgloszeniaUzytkownikowDataSource: DataSource<ZgloszenieUzytkownika>;

  /**
   * Konstruktor tworzący obiekt klasy PrzejrzyjZgloszeniaOfertyComponent
   * @param {OfertaService} ofertaService
   * @param {UzytkownikService} uzytkownikService
   */
  constructor(private ofertaService: OfertaService, private uzytkownikService: UzytkownikService) {
  }

  ngOnInit() {
    this.ofertaService.getZgloszeniaOfert().subscribe(result => {
      const data: ZgloszenieOferty[] = [];

      const zgloszeniaUzytkownikow = result._embedded.zgloszenieOferties;
      zgloszeniaUzytkownikow.forEach(zgloszenieOferty => {
        data.push({
          id: zgloszenieOferty.id,
          powod: zgloszenieOferty.powod, tresc: zgloszenieOferty.tresc,
          dataDodania: new Date(zgloszenieOferty.dataDodania), przeczytane: zgloszenieOferty.przeczytane,
          zgloszonaOferta: {
            id: zgloszenieOferty.zgloszonaOferta[0].id,
            tytul: zgloszenieOferty.zgloszonaOferta[0].tytul
          }
        });
      });
      this.zgloszeniaOfertDataSource = new MatTableDataSource<ZgloszenieOferty>(data);
    });

    this.uzytkownikService.getZgloszeniaUzytkownikow().subscribe(result => {
      const data: ZgloszenieUzytkownika[] = [];

      const zgloszeniaUzytkownikow = result._embedded.zgloszenieUzytkownikas;
      zgloszeniaUzytkownikow.forEach(zgloszenieUzytkownika => {
        data.push({
          id: zgloszenieUzytkownika.id,
          powod: zgloszenieUzytkownika.powod, tresc: zgloszenieUzytkownika.tresc,
          dataDodania: new Date(zgloszenieUzytkownika.dataDodania), przeczytane: zgloszenieUzytkownika.przeczytane,
          zgloszonyUzytkownik: zgloszenieUzytkownika.zgloszonyUzytkownik[0].login
        });
      });
      this.zgloszeniaUzytkownikowDataSource = new MatTableDataSource<ZgloszenieUzytkownika>(data);
    });
  }

  zmienPrzeczytaneZgloszenieUzytkownika(element: ZgloszenieUzytkownika) {
    this.uzytkownikService.patchZgloszenieUzytkownika(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
    });
  }

  zmienPrzeczytaneZgloszenieOferty(element: ZgloszenieOferty) {
    this.ofertaService.patchZgloszenieOferty(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
    });
  }
}
