import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from "@angular/material";
import {UwagaService} from "../../services/uwaga.service";

/**
 * Logika biznesowa dla komponentu zgłaszania uwagi
 */
@Component({
  selector: 'app-zglaszanie-uwagi',
  templateUrl: './zglaszanie-uwagi.component.html',
  styleUrls: ['./zglaszanie-uwagi.component.css'],
  viewProviders: [UwagaService]
})
export class ZglaszanieUwagiComponent implements OnInit {
  zglosUwageForm: FormGroup;

  selected: String;
  powody: any[] = [
    {value: 'Brak funkcji aplikacji'},
    {value: 'Niewłaściwe funkcjonowanie aplikacji'},
    {value: 'Zmiana zawartości aplikacji'}
  ];

  constructor(private snackBar: MatSnackBar, private uwagaService: UwagaService) {
  }

  ngOnInit(): void {
    this.zglosUwageForm = new FormGroup({
      'powod': new FormControl(),
      'tresc': new FormControl()
    });
  }

  zglos() {
    const data = this.zglosUwageForm.value;
    data.powod = data.powod.value;

    this.uwagaService.postUwaga(data).subscribe(result => {
      this.snackBar.open('Zgłoszono uwagę. Dziękujemy.', null, {
        duration: 2000,
      });
    }, () => {
      this.snackBar.open('Wystąpił błąd. Upewnij się, czy format wprowadzonych danych jest poprawny.', null, {
        duration: 2000,
      });
    });
  }
}
