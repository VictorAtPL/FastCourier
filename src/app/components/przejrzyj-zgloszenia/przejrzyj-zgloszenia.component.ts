import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {OfertaService} from '../../services/oferta.service';
import {UzytkownikService} from '../../services/uzytkownik.service';
import {DataSource} from '@angular/cdk/collections';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {TdDialogService} from '@covalent/core';

export interface ZgloszonaOferta {
  id: number;
  tytul: string;
  zablokowana: boolean;
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
  zgloszonyUzytkownik: ZgloszonyUzytkownik;
  dataDodania: Date;
  przeczytane: boolean;
}

export interface ZgloszonyUzytkownik {
  login: string;
  rola: string;
  zablokowany: boolean;
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
  constructor(private ofertaService: OfertaService,
              private uzytkownikService: UzytkownikService,
              private snackBar: MatSnackBar,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) {
  }

  /**
   * Metoda odpowiedzialna za ustawienie walidatorów. Wywoływana przy starcie formularza.
   */
  ngOnInit() {
    this.ofertaService.getZgloszeniaOfert().subscribe(result => {
      const data: ZgloszenieOferty[] = [];

      const zgloszeniaUzytkownikow = result._embedded.zgloszenieOferties;
      zgloszeniaUzytkownikow.forEach(zgloszenieOferty => {
        data.push({
          id: zgloszenieOferty.id,
          powod: zgloszenieOferty.powod, tresc: zgloszenieOferty.tresc,
          dataDodania: new Date(zgloszenieOferty.dataDodania), przeczytane: zgloszenieOferty.przeczytane,
          zgloszonaOferta: zgloszenieOferty.zgloszonaOferta[0]
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
          zgloszonyUzytkownik: zgloszenieUzytkownika.zgloszonyUzytkownik[0]
        });
      });
      this.zgloszeniaUzytkownikowDataSource = new MatTableDataSource<ZgloszenieUzytkownika>(data);
    });
  }

  /**
   * Metoda zmieniająca status zgłoszenia - użytkownika na przeczytane.
   * @param {ZgloszenieUzytkownika} element
   */
  zmienPrzeczytaneZgloszenieUzytkownika(element: ZgloszenieUzytkownika) {
    this.uzytkownikService.patchZgloszenieUzytkownika(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
    });
  }

  /**
   * Metoda zmieniająca status zgłoszenia - oferty na przeczytane.
   * @param {ZgloszenieOferty} element
   */
  zmienPrzeczytaneZgloszenieOferty(element: ZgloszenieOferty) {
    this.ofertaService.patchZgloszenieOferty(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
    });
  }

  /**
   * Metoda blokująca użytkownika.
   * @param {ZgloszenieUzytkownika} element
   */
  zablokujUzytkownika(element: ZgloszenieUzytkownika) {
    this._dialogService.openConfirm({
      message: 'Blokowanie użytkownika jest operacją, której nie można cofnąć. Czy na pewno chcesz zablokować użytkownika?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      cancelButton: 'Anuluj',
      acceptButton: 'Potwierdź',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        element.przeczytane = true;

        this.uzytkownikService.patchZgloszenieUzytkownika(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
          this.uzytkownikService.patchUzytkownik(element.zgloszonyUzytkownik.login, {'zablokowany': true}).subscribe(() => {
            element.zgloszonyUzytkownik.zablokowany = true;

            this.snackBar.open('Zablokowano użytkownika.', null, {
              duration: 2000,
            });
          });
        });
      }
    });
  }

  /**
   * Metoda blokująca ofertę.
   * @param {ZgloszenieOferty} element
   */
  zablokujOferte(element: ZgloszenieOferty) {
    this._dialogService.openConfirm({
      message: 'Blokowanie oferty jest operacją, której nie można cofnąć. Czy na pewno chcesz zablokować ofertę?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      cancelButton: 'Anuluj',
      acceptButton: 'Potwierdź',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        element.przeczytane = true;

        this.ofertaService.patchZgloszenieOferty(element.id, {'przeczytane': element.przeczytane}).subscribe(() => {
          this.ofertaService.patchOferta(element.zgloszonaOferta.id, {'zablokowana': true}).subscribe(() => {
            element.zgloszonaOferta.zablokowana = true;

            this.snackBar.open('Zablokowano ofertę.', null, {
              duration: 2000,
            });
          });
        });
      }
    });
  }
}
