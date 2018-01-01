import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';
import {TdDialogService} from "@covalent/core";
import {UwierzytelnianieService} from "../../services/uwierzytelnianie.service";

/**
 * Klasa odpowiedzialna za widok strony przeglądania oferty
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Component({
  selector: 'app-przejrzyj-oferte',
  templateUrl: './przejrzyj-oferte.component.html',
  styleUrls: ['./przejrzyj-oferte.component.css'],
  viewProviders: [OfertaService]
})
export class PrzejrzyjOferteComponent implements OnInit {

  /**
   * Zmienna przechowująca numer oferty
   */
  id: number;

  /**
   * Obiekt przechowujący atrybuty oferty.
   * @type {{}}
   */
  oferta: any;
  /**
   * Obiekt przechowujący inny obiekt, który będziemy obserwować. Zawiera on stan parametrów URL aktualnie przeglądanej strony.
   */
  private sub: any;

  zalogowanyUzytkownik: any;

  /**
   * Konstruktor odpowiedzialny za powołanie nowej instancji oferty.
   * @param {ActivatedRoute} route
   * @param {OfertaService} ofertaService
   * @param {MatSnackBar} snackBar
   * @param {Router} router
   */
  constructor(private route: ActivatedRoute, private ofertaService: OfertaService,
              private snackBar: MatSnackBar, private router: Router,
              private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef,
              private autentykacjaService: UwierzytelnianieService) {
  }

  /**
   * Metoda odpowiedzialna za pobranie danych oferty z backendu.
   */
  ngOnInit() {
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.ofertaService.getOferta(this.id).subscribe(oferta => {
        this.oferta = oferta;
        this.oferta.rozmiaryPaczek = oferta.rozmiaryPaczek.split(',');
        this.oferta.kategoriePaczek = oferta.kategoriePaczek.split(',');
        this.oferta.dataGodzinaWyjazdu = this.fetchDataGodzinaWyjazdu(oferta.dataWyjazdu, oferta.godzinaWyjazdu);

      }, () => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy użytkownik o podanym loginie istnieje.', null, {
          duration: 2000,
        });
      });
    });

  }

  /**
   * Metoda odpowiedzialna za przejście na stronę zgłaszania oferty po naciśnięciu przycisku "zgłoś ofertę".
   */
  zglosOferte() {
    this.router.navigate(['/oferta/zglos', this.id]);
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

  zablokujOferte(oferta: any) {
    this._dialogService.openConfirm({
      message: 'Blokowanie oferty jest operacją, której nie można cofnąć. Czy na pewno chcesz zablokować ofertę?',
      disableClose: false,
      viewContainerRef: this._viewContainerRef,
      cancelButton: 'Anuluj',
      acceptButton: 'Potwierdź',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.ofertaService.patchOferta(this.id, {'zablokowana': true}).subscribe(() => {
          oferta.zablokowana = true;

          this.snackBar.open('Zablokowano ofertę.', null, {
            duration: 2000,
          });
        });
      }
    });
  }
}
