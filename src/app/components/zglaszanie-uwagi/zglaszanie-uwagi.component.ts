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

/**
 * Klasa odpwiedzialna za tworzenie obiektów zgłasznych uwag
 * @author Michał Świerczewski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 *
 */
export class ZglaszanieUwagiComponent implements OnInit {
  /**
   *  Obiekt przechowujacy zgrupupowane uwagi
   */
  zglosUwageForm: FormGroup;

  selected: String;
  /**
   * Tabalica zawierająca powody zgłoszenia użytkownika
   * @type {[{value: string} , {value: string} , {value: string}]}
   */
  powody: any[] = [
    {value: 'Brak funkcji aplikacji'},
    {value: 'Niewłaściwe funkcjonowanie aplikacji'},
    {value: 'Zmiana zawartości aplikacji'}
  ];

  /**
   *  Konstruktor tworzący obiekt klasy ZglaszanieUwagiComponent
   * @param {MatSnackBar} snackBar
   * @param {UwagaService} uwagaService
   */
  constructor(private snackBar: MatSnackBar, private uwagaService: UwagaService) {
  }

  /**
   * Tworzenie obiektu uwagi
   */
  ngOnInit(): void {
    this.zglosUwageForm = new FormGroup({
      'powod': new FormControl(),
      'tresc': new FormControl()
    });
  }

  /**
   * Metoda odpowiedzialna za przyjomawnie, tworzenie obiektów uwag i wyświetlenie komunikatów odnośnie czy udało się zarejestrować uwagę
   */
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
