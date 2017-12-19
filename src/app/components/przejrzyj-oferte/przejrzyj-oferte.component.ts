import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {OfertaService} from '../../services/oferta.service';

@Component({
  selector: 'app-przejrzyj-oferte',
  templateUrl: './przejrzyj-oferte.component.html',
  styleUrls: ['./przejrzyj-oferte.component.css'],
  viewProviders: [OfertaService]
})
export class PrzejrzyjOferteComponent implements OnInit {
  id: number;
  oferta: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private ofertaService: OfertaService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
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

  zglosOferte() {
    this.router.navigate(['/oferta/zglos', this.id]);
  }

  czyOfertaWyrozniona() {
    const oferta = this.oferta;
    console.log(oferta.czyWyroznic);

    if (oferta.czyWyroznic) {
      return true;
    }
    return false;
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
