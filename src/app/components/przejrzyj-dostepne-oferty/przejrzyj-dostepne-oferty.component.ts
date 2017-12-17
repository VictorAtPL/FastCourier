import {Component, OnInit} from '@angular/core';
import {OfertaService} from '../../services/oferta.service';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

export interface Oferta {
  id: number;
  tytul: string;
  miastoDocelowe: string;
  cenaMaksymalna: number;
  loginUzytkownika: string;
  kategoriePaczek: string[];
  rozmiaryPaczek: string[];
  maksymalnaWagaPaczki: null | number;
  miastoPoczatkowe: string;
  cenaMinimalna: number;
  dataGodzinaWyjazdu: Date;
}

@Component({
  selector: 'app-przejrzyj-dostepne-oferty',
  templateUrl: './przejrzyj-dostepne-oferty.component.html',
  styleUrls: ['./przejrzyj-dostepne-oferty.component.css'],
  viewProviders: [OfertaService]
})
export class PrzejrzyjDostepneOfertyComponent implements OnInit {
  displayedColumns = ['dataGodzina', 'tytul', 'wystawiajacy', 'cena', 'kategoriePaczek', 'rozmiaryPaczek', 'maksymalnaWagaPaczki'];
  dataSource: DataSource<Oferta>;
  data: Oferta[] = [];

  constructor(private ofertaService: OfertaService) {
  }

  ngOnInit() {
    this.ofertaService.getOferty().subscribe(result => {
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
        });
      });

      this.dataSource = new MatTableDataSource<Oferta>(this.data);
    });
  }

  private fetchDataGodzinaWyjazdu(dataWyjazdu: string, godzinaWyjazdu: string): Date {
    const godzinaWyjazdu_a = godzinaWyjazdu.split(':');
    return new Date(new Date(dataWyjazdu).setHours(Number(godzinaWyjazdu_a[0]), Number(godzinaWyjazdu_a[1]), 0));
  }

}
