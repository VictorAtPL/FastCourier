import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Oferta} from '../../entities/Oferta.entity';
import {OfertaService} from '../../services/oferta.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {UwierzytelnianieService} from '../../services/uwierzytelnianie.service';
import {TdDialogService} from '@covalent/core';

@Component({
  selector: 'app-zarzadzaj-ofertami',
  templateUrl: './zarzadzaj-ofertami.component.html',
  styleUrls: ['./zarzadzaj-ofertami.component.css']
})
export class ZarzadzajOfertamiComponent implements OnInit {
  /**
   * Lista kolumn, które mają być wyświetlone w tabeli.
   * @type {[string , string , string , string , string , string , string]}
   */
  displayedColumns = ['dataGodzina', 'tytul', 'cena', 'kategoriePaczek', 'rozmiaryPaczek', 'akcje'];
  /**
   * Źródło danych dla komponentu tabeli.
   */
  dataSource: DataSource<Oferta>;
  /**
   * Tablica z ofertami pobranymi z serwisu REST.
   * @type {Array}
   */
  data: Oferta[] = [];

  zalogowanyUzytkownik: any;

  date: Date;

  /**
   * Konstruktor wstrzykujący usługi z których można potem korzystać w komponencie.
   * @param {OfertaService} ofertaService Komponent dostępu do ofert przez REST.
   * @param autentykacjaService
   * @param snackBar
   * @param _dialogService
   * @param _viewContainerRef
   */
  constructor(private ofertaService: OfertaService,
              private autentykacjaService: UwierzytelnianieService,
              private snackBar: MatSnackBar,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef) {
  }

  /**
   * Funkcja wywoływana przy inicjalizacji komponentu (ładowaniu strony przejrzenia dostępnych ofert).
   */
  ngOnInit() {
    this.date = new Date();

    this.autentykacjaService.czyZalogowany().subscribe(next => {

      if (next != null) {
        this.zalogowanyUzytkownik = next;

        this.ofertaService.getOfertyUzytkownika(this.zalogowanyUzytkownik.login).subscribe(result => {
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
              aktywna: oferta.aktywna,
              zablokowana: oferta.zablokowana,
              zleceniaTransportu: oferta.zleceniaTransportu
            });
          });

          this.data.sort((a, b) => {
            if (a.dataGodzinaWyjazdu > b.dataGodzinaWyjazdu) {
              return -1;
            } else if (a.dataGodzinaWyjazdu === b.dataGodzinaWyjazdu) {
              return 0;
            } else {
              return 1;
            }
          });

          this.dataSource = new MatTableDataSource<Oferta>(this.data);
        });
      }
    });
  }

  zdejmijOferte(element: Oferta) {
    this._dialogService.openConfirm({
      message: 'Dezaktywacja oferty jest operacją, której nie można cofnąć. Nadal będziesz musiał zrealizować zlecenia, które do tej pory zostały dodane. Czy na pewno chcesz zdjąć ofertę z portalu?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      cancelButton: 'Anuluj',
      acceptButton: 'Potwierdź',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        element.aktywna = false;

        this.ofertaService.patchOferta(element.id, {'aktywna': element.aktywna}).subscribe(() => {
          this.snackBar.open('Zdjęto ofertę z portalu.', null, {
            duration: 2000,
          });
        });
      }
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
