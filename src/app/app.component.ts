import {Component} from '@angular/core';
import {TdMediaService} from '@covalent/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public navLinks;

  constructor(public media: TdMediaService,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this.navLinks = [
      {
        'label': 'Strona główna',
        'path': 'powitanie'
      },
      {
        'label': 'Panel użytkownika',
        'path': 'uzytkownik/panel'
      },
      {
        'label': 'Zgłoś użytkownika',
        'path': 'uzytkownik/zglos'
      },
      {
        'label': 'Zgłoś ofertę',
        'path': 'oferta/zglos'
      },
      {
        'label': 'Zgłoś uwagę',
        'path': 'uwaga/zglos'
      },
      {
        'label': 'Panel administratora',
        'path': 'administrator/panel'
      }
    ];

    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('https://raw.githubusercontent.com/Teradata/covalent-quickstart/develop/src/assets/icons/covalent-mark.svg'));
  }
}
