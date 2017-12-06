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
        'label': 'Dodaj ofertę',
        'path': 'oferta/dodaj'
      },
      {
        'label': 'Logowanie',
        'path': 'logowanie'
      },
      {
        'label': 'Napisz wiadomość',
        'path': 'wiadomosc/wyslij'
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
        'label': 'Zgłoś transakcję',
        'path': 'transakcja/zglos'
      },
      {
        'label': 'Zgłoś uwagę',
        'path': 'uwaga/zglos'
      }
      ,
      {
        'label': 'Edytuj zapoznanie sie z serwisem',
        'path': 'zapoznaj_sie_z_serwisem/edytuj'
      }
      ,
      {
        'label': 'Spersonalizuj profil',
        'path': 'profil/edytuj'
      },
      {
        'label': 'Dodaj regulamin',
        'path': 'regulamin/dodaj'
      },
      {
        'label': 'Ocen transakcje',
        'path': 'transakcja/ocen'
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
