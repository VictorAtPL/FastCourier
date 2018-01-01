import {Component} from '@angular/core';
import {UwierzytelnianieService} from "../../services/uwierzytelnianie.service";

/**
 * Logika biznesowa dla strony głównej, na której jest formularz wyszukiwania
 */
@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent {
  zalogowanyUzytkownik = {};

  constructor(private autentykacjaService: UwierzytelnianieService) {
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });
  }
}
