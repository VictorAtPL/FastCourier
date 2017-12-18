import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from "../../services/oferta.service";


@Component({
  selector: 'app-przejrzyj-oferte',
  templateUrl: './przejrzyj-oferte.component.html',
  styleUrls: ['./przejrzyj-oferte.component.css'],
  viewProviders: [OfertaService]
})

/**
 * Klasa odpowiedzialna za widok strony przeglądania oferty
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export class PrzejrzyjOferteComponent implements OnInit {

  /**
   * Zmienna przechowująca numer oferty
   */
  id: number;

  /**
   * Obiekt przechowujący atrybuty oferty.
   * @type {{}}
   */
  oferta: any = {};
  /**
   * Obiekt przechowujący inny obiekt, który będziemy obserwować. Zawiera on stan parametrów URL aktualnie przeglądanej strony.
   */
  private sub: any;

  /**
   * Konstruktor odpowiedzialny za powołanie nowej instancji oferty.
   * @param {ActivatedRoute} route
   * @param {OfertaService} ofertaService
   * @param {MatSnackBar} snackBar
   * @param {Router} router
   */
  constructor(private route: ActivatedRoute, private ofertaService: OfertaService, private snackBar: MatSnackBar, private router: Router) {
  }

  /**
   * Metoda odpowiedzialna za pobranie danych oferty z backendu.
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.ofertaService.getOferta(this.id).subscribe(oferta => {
        this.oferta = oferta;
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
}
