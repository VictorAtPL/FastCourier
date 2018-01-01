import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UzytkownikService} from './uzytkownik.service';

@Injectable()
export class UwierzytelnianieService {
  private zalogowanyUzytkownik = new BehaviorSubject<object>(null);

  constructor(private http: HttpClient, private uzytkownikService: UzytkownikService) {
    if (localStorage.getItem('zalogowanyUzytkownik')) {
      const zalogowanyUzytkownik: any = JSON.parse(localStorage.getItem('zalogowanyUzytkownik'));

      this.weryfikuj(zalogowanyUzytkownik.login, zalogowanyUzytkownik.haslo).subscribe(uzytkownik => {
        if (String(uzytkownik.haslo) === String(zalogowanyUzytkownik.haslo) && !uzytkownik.zablokowany) {
          uzytkownik.login = zalogowanyUzytkownik.login;
          this.zalogowanyUzytkownik.next(uzytkownik);
        } else {
          this.wyloguj();
        }
      }, () => this.wyloguj());
    }
  }

  czyZalogowany() {
    return this.zalogowanyUzytkownik.asObservable();
  }

  weryfikuj(nazwaUzytkownika: string, haslo: string) {
    return this.uzytkownikService.getUzytkownik(nazwaUzytkownika);
  }

  zaloguj(login: string, uzytkownik: any) {
    uzytkownik['login'] = login;
    this.zalogowanyUzytkownik.next(uzytkownik);
    localStorage.setItem('zalogowanyUzytkownik', JSON.stringify(uzytkownik));
  }

  wyloguj() {
    this.zalogowanyUzytkownik.next(null);
    localStorage.removeItem('zalogowanyUzytkownik');
  }
}
