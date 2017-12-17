import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from "@angular/cdk/collections";
import {OfertaService} from "../../services/oferta.service";

export interface ZgloszonaOferta {
  id: number;
  tytul: string;
}

export interface ZgloszenieOferty {
  powod,
  tresc,
  zgloszonaOferta: ZgloszonaOferta
}

@Component({
  selector: 'app-przejrzyj-zgloszenia-ofert',
  templateUrl: './przejrzyj-zgloszenia-ofert.component.html',
  styleUrls: ['./przejrzyj-zgloszenia-ofert.component.css'],
  viewProviders: [OfertaService]
})
export class PrzejrzyjZgloszeniaOfertComponent implements OnInit {
  displayedColumns = ['zgloszonaOferta', 'powod', 'tresc'];
  dataSource: DataSource<ZgloszenieOferty>;

  constructor(private ofertaService: OfertaService) {
  }

  ngOnInit() {
    const data: ZgloszenieOferty[] = [];

    this.ofertaService.getZgloszeniaOfert().subscribe(result => {
      const zgloszeniaUzytkownikow = result._embedded.zgloszenieOferties;
      zgloszeniaUzytkownikow.forEach((zgloszenieOferty, index) => {
        data.push({
          powod: zgloszenieOferty.powod, tresc: zgloszenieOferty.tresc,
          zgloszonaOferta: {
            id: zgloszenieOferty.zgloszonaOferta[0].id,
            tytul: zgloszenieOferty.zgloszonaOferta[0].tytul
          }
        });
      });
      this.dataSource = new MatTableDataSource<ZgloszenieOferty>(data);
    });
  }

}
