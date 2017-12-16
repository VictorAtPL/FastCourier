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
export class PrzejrzyjOferteComponent implements OnInit {
  id: number;
  oferta: any = {};
  private sub: any;

  constructor(private route: ActivatedRoute, private ofertaService: OfertaService, private snackBar: MatSnackBar, private router: Router) {
  }

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

  zglosOferte() {
    // this.router.navigate(['/uzytkownik/zglos', login]);
  }
}
