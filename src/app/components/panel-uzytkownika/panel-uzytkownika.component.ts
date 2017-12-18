import {Component, OnInit} from '@angular/core';
import {AutentykacjaService} from '../../services/autentykacja.service';

/**
 * Logika biznesowa dla panelu administratora
 */
@Component({
  selector: 'app-panel-uzytkownika',
  templateUrl: './panel-uzytkownika.component.html',
  styleUrls: ['./panel-uzytkownika.component.css']
})
export class PanelUzytkownikaComponent implements OnInit {
  zalogowanyUzytkownik: any;

  /**
   * Konstruktor klasy autentykacjaService
   * @param {AutentykacjaService} autentykacjaService
   */
  constructor(private autentykacjaService: AutentykacjaService) {
  }

  ngOnInit(): void {
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });
  }
}
