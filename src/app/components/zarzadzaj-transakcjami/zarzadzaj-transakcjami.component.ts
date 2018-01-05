import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TdDialogService} from "@covalent/core";
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {UzytkownikService} from "../../services/uzytkownik.service";
import {OfertaService} from "../../services/oferta.service";
import {UwierzytelnianieService} from "../../services/uwierzytelnianie.service";
import {DataSource} from "@angular/cdk/collections";
import {StatusZlecenia} from "../../enums/status-zlecenia";
import {PowiadomieniaService} from "../../services/powiadomienia.service";
import {TypPowiadomienia} from "../../enums/typ-powiadomienia";

@Component({
  selector: 'app-zarzadzaj-transakcjami',
  templateUrl: './zarzadzaj-transakcjami.component.html',
  styleUrls: ['./zarzadzaj-transakcjami.component.css']
})
export class ZarzadzajTransakcjamiComponent implements OnInit {

  zalogowanyUzytkownik: any;

  zleconeMiDataSource: DataSource<any>;

  jaZlecilemDataSource: DataSource<any>;

  public statusZlecenia = StatusZlecenia;

  dateNow = new Date();

  constructor(private ofertaService: OfertaService,
              private uzytkownikService: UzytkownikService,
              private snackBar: MatSnackBar,
              private autentykacjaService: UwierzytelnianieService,
              private _dialogService: TdDialogService,
              private _viewContainerRef: ViewContainerRef,
              private powiadomieniaService: PowiadomieniaService) {
  }

  ngOnInit() {
    const data_zleconeMi: any[] = [];
    const data_jaZlecilem: any[] = [];

    this.autentykacjaService.czyZalogowany().subscribe(next => {
      if (next != null) {
        this.zalogowanyUzytkownik = next;

        this.ofertaService.getZlecenia().subscribe(result => {
          const zleceniaTransportu = result._embedded.zlecenieTransportus;
          zleceniaTransportu.forEach(zlecenieTransportu => {
            const row = {
              id: zlecenieTransportu.id,
              komentarz: zlecenieTransportu.komentarz,
              rozmiarPaczki: zlecenieTransportu.rozmiarPaczki,
              kategoriaPaczki: zlecenieTransportu.kategoriaPaczki,
              dataZlecenia: new Date(zlecenieTransportu.dataZlecenia),
              wagaPaczki: zlecenieTransportu.wagaPaczki,
              dotyczyOferty: zlecenieTransportu.dotyczyOferty,
              zlecajacyUzytkownik: zlecenieTransportu.zlecajacyUzytkownik,
              statusZlecenia: zlecenieTransportu.statusZlecenia,
              dataGodzinaWyjazdu: this.fetchDataGodzinaWyjazdu(zlecenieTransportu.dotyczyOferty.dataWyjazdu,
                zlecenieTransportu.dotyczyOferty.godzinaWyjazdu),
            };

            if (row.dotyczyOferty.ofertaUzytkownika[0].login === this.zalogowanyUzytkownik.login) {
              data_zleconeMi.push(row);
            }

            if (row.zlecajacyUzytkownik.login === this.zalogowanyUzytkownik.login) {
              data_jaZlecilem.push(row);
            }
          });

          data_zleconeMi.sort((a, b) => {
            if (a.dataZlecenia > b.dataZlecenia) {
              return -1;
            } else if (a.dataZlecenia === b.dataZlecenia) {
              return 0;
            } else {
              return 1;
            }
          });

          data_jaZlecilem.sort((a, b) => {
            if (a.dataZlecenia > b.dataZlecenia) {
              return -1;
            } else if (a.dataZlecenia === b.dataZlecenia) {
              return 0;
            } else {
              return 1;
            }
          });

          this.zleconeMiDataSource = new MatTableDataSource<any>(data_zleconeMi);
          this.jaZlecilemDataSource = new MatTableDataSource<any>(data_jaZlecilem);
        });
      }
    });
  }

  zmienStatus(element: any, nowyStatus: string) {
    element.statusZlecenia = nowyStatus;
    this.ofertaService.patchZlecenie(element.id, {statusZlecenia: element.statusZlecenia}).subscribe((result) => {

      this.powiadomieniaService.postPowiadomienie({
        typPowiadomienia: TypPowiadomienia.ZMIANA_STATUSU_ZLECENIA,
        idTypuPowiadomienia: element.id,
      }).subscribe((powiadomienie) => {
        this.powiadomieniaService.putPowiadomienieUzytkownikaPowiadomienie(
          powiadomienie._links.uzytkownik.href,
          element.zlecajacyUzytkownik._links.self.href.replace('{?projection}', '')
        ).subscribe(() => {
        });
      });
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
