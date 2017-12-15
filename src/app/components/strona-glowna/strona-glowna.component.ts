import {Component} from '@angular/core';
import {AutentykacjaService} from "../../services/autentykacja.service";

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

  constructor(private autentykacjaService: AutentykacjaService) {
    this.autentykacjaService.czyZalogowany().subscribe(next => {
      this.zalogowanyUzytkownik = next;
    });
  }
}
