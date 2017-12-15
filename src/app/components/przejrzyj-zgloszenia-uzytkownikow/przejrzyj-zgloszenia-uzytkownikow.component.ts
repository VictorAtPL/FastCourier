import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {UzytkownikService} from "../../services/uzytkownik.service";
import {DataSource} from "@angular/cdk/collections";

export interface ZgloszenieUzytkownika {
  powod,
  tresc,
  zgloszonyUzytkownik
}

@Component({
  selector: 'app-przejrzyj-zgloszenia-uzytkownikow',
  templateUrl: './przejrzyj-zgloszenia-uzytkownikow.component.html',
  styleUrls: ['./przejrzyj-zgloszenia-uzytkownikow.component.css'],
  viewProviders: [UzytkownikService]
})
export class PrzejrzyjZgloszeniaUzytkownikowComponent implements OnInit {
  displayedColumns = ['zgloszonyUzytkownik', 'powod', 'tresc'];
  dataSource: DataSource<ZgloszenieUzytkownika>;

  constructor(private uzytkownikService: UzytkownikService) {
  }

  ngOnInit() {
    const data: ZgloszenieUzytkownika[] = [];

    this.uzytkownikService.getZgloszeniaUzytkownikow().subscribe(result => {
      const zgloszeniaUzytkownikow = result._embedded.zgloszenieUzytkownikas;
      zgloszeniaUzytkownikow.forEach((zgloszenieUzytkownika, index) => {
        data.push({
          powod: zgloszenieUzytkownika.powod, tresc: zgloszenieUzytkownika.tresc,
          zgloszonyUzytkownik: zgloszenieUzytkownika.zgloszonyUzytkownik[0].login
        });
      });
      this.dataSource = new MatTableDataSource<ZgloszenieUzytkownika>(data);
    });
  }

}
