import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UzytkownikService} from "../../services/uzytkownik.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-przejrzyj-profil',
  templateUrl: './przejrzyj-profil.component.html',
  styleUrls: ['./przejrzyj-profil.component.css'],
  viewProviders: [UzytkownikService]
})

/**
 * Klasa odpowiedzialna za widok strony Przejrzyj profil
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export class PrzejrzyjProfilComponent implements OnInit, OnDestroy {
  /**
   * Zmienna przechowująca login użytkownika.
   */
  login: string;

  /**
   * Zmienna przechowująca nazwę użytkownika.
   * @type {{}}
   */
  uzytkownik: any = {};

  /**
   * Obiekt przechowujący inny obiekt, który będziemy obserwować. Zawiera on stan parametrów URL aktualnie przeglądanej strony.
   */
  private sub: any;

  /**
   * Konstruktor odpowiedzialny za powołanie nowej instancji obiektu.
   * @param {ActivatedRoute} route
   * @param {UzytkownikService} uzytkownikService
   * @param {MatSnackBar} snackBar
   * @param {Router} router
   */
  constructor(private route: ActivatedRoute, private uzytkownikService: UzytkownikService,
              private snackBar: MatSnackBar, private router: Router) {
  }

  /**
   * Metoda odpowiedzialna za pobranie danych profilu z backendu.
   */
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.login = params['login'];

      this.uzytkownikService.getUzytkownik(this.login).subscribe(uzytkownik => {
        this.uzytkownik = uzytkownik;
      }, error2 => {
        this.snackBar.open('Wystąpił błąd. Upewnij się, czy użytkownik o podanym loginie istnieje.', null, {
          duration: 2000,
        });
      });
    });
  }

  /**
   *Funkcja wywoływana przy zamykaniu/zmianiu strony.
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  /**
   * Metoda odpowiedzialna za przejscie na stronę zgłaszania użytkownika, po kliknięciu przycisku "zgłoś użytkownika".
   * @param {String} login
   */
  zglosUzytkownika(login: String) {
    this.router.navigate(['/uzytkownik/zglos', login]);
  }
}
