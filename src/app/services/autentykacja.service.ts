import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';

@Injectable()
export class AutentykacjaService {
  private zalogowanyUzytkownik = new BehaviorSubject<object>(null);

  constructor(private http: HttpClient) {
    console.log(localStorage.getItem('zalogowanyUzytkownik'));
    if (localStorage.getItem('zalogowanyUzytkownik')) {
      const zalogowanyUzytkownik: any = JSON.parse(localStorage.getItem('zalogowanyUzytkownik'));

      this.weryfikuj(zalogowanyUzytkownik.login, zalogowanyUzytkownik.haslo).subscribe(uzytkownik => {
        if (uzytkownik.haslo === zalogowanyUzytkownik.haslo) {
          this.zalogowanyUzytkownik.next(zalogowanyUzytkownik);
        } else {
          this.wyloguj();
        }
      }, err => this.wyloguj());
    }
  }

  czyZalogowany() {
    return this.zalogowanyUzytkownik.asObservable();
  }

  weryfikuj(nazwaUzytkownika: String, haslo: String) {
    return this.http.get<any>(environment.restUrl + '/uzytkownicy/' + nazwaUzytkownika);
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
