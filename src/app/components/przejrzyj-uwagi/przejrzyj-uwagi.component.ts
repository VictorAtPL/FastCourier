import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {UwagaService} from '../../services/uwaga.service';
import {MatTableDataSource} from '@angular/material/table';

export interface Uwaga {
  powod;
  tresc;
}

@Component({
  selector: 'app-przejrzyj-uwagi',
  templateUrl: './przejrzyj-uwagi.component.html',
  styleUrls: ['./przejrzyj-uwagi.component.css'],
  viewProviders: [UwagaService]
})
export class PrzejrzyjUwagiComponent implements OnInit {
  displayedColumns = ['powod', 'tresc'];
  dataSource: DataSource<Uwaga>;

  constructor(private uwagaService: UwagaService) {
  }

  ngOnInit() {
    const data: Uwaga[] = [];

    this.uwagaService.getUwagi().subscribe(result => {
      const uwagi = result._embedded.uwagas;
      uwagi.forEach((uwaga, index) => {
        data.push({
          powod: uwaga.powod, tresc: uwaga.tresc
        });
      });
      this.dataSource = new MatTableDataSource<Uwaga>(data);
    });
  }

}
