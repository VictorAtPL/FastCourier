import {Component} from '@angular/core';

/**
 * Logika biznesowa dla strony głównej, na której jest formularz wyszukiwania
 */
@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent {
  zalogowanyUzytkownik: any = {};

  constructor() {
    this.zalogowanyUzytkownik = JSON.parse(localStorage.getItem('zalogowanyUzytkownik'));
  }
}
