import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {UwierzytelnianieService} from "../../services/uwierzytelnianie.service";
import {TdDialogService} from "@covalent/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {UzytkownikService} from "../../services/uzytkownik.service";

/**
 * Logika biznesowa dla oceny transakcji
 */
@Component({
  selector: 'app-ocena-transakcji',
  templateUrl: './ocena-transakcji.component.html',
  styleUrls: ['./ocena-transakcji.component.css']
})
export class OcenaTransakcjiComponent implements OnInit, OnDestroy {
  /**
   * Zmienna przechowująca login użytkownika.
   */
  login: string;

  /**
   * Zmienna przechowująca nazwę użytkownika.
   * @type {{}}
   */
  uzytkownik: any;
  liczbaGwiazdek = 0;
  /**
   * Obiekt przechowujący inny obiekt, który będziemy obserwować. Zawiera on stan parametrów URL aktualnie przeglądanej strony.
   */
  private sub: any;

  constructor(private route: ActivatedRoute, private uzytkownikService: UzytkownikService,
              private snackBar: MatSnackBar, private router: Router,
              private _dialogService: TdDialogService, private _viewContainerRef: ViewContainerRef,
              private autentykacjaService: UwierzytelnianieService) {
  }

  ngOnInit(): void {
    this.liczbaGwiazdek = 1;

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


  wystawOcene(ocena: number) {
    this.uzytkownikService.patchUzytkownik(this.login,
      {sumaOcen: this.uzytkownik.sumaOcen + ocena, liczbaOcen: this.uzytkownik.liczbaOcen + 1}).subscribe((result) => {
      const refSnackBar = this.snackBar.open('Dodano ocenę. Za chwile nastąpi przekierowanie.', null, {
        duration: 2000,
      });

      refSnackBar.afterDismissed().subscribe(() => {
        this.router.navigate(['/uzytkownik/profil', this.login]);
      });
    });
  }
}
