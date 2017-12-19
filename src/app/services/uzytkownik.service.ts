import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UzytkownikService {

  constructor(private http: HttpClient) {
  }

  postUzytkownik(data: any) {
    return this.http.post<any>(environment.restUrl + '/uzytkownicy', data);
  }

  getUzytkownik(login: string) {
    return this.http.get<any>(environment.restUrl + '/uzytkownicy/' + login);
  }

  patchUzytkownik(login: string, data: any) {
    return this.http.patch(environment.restUrl + '/uzytkownicy/' + login, data);
  }

  /**
   * Metody obsługujące żądanie POST zgłaszania użytkowników
   * @param data zawartość formularza
   * @returns {Observable<Object>}
   */
  postZgloszenieUzytkownika(data: any) {
    return this.http.post<any>(environment.restUrl + '/zgloszeniauzytkownikow', data);
  }

  patchZgloszenieUzytkownika(id: number, data: any) {
    return this.http.patch(environment.restUrl + '/zgloszeniauzytkownikow/' + id, data);
  }

  /**
   * Metoda obsługująca dodanie zasobów za pomocą żądania PUT.
   * @param {string} url adres zasobu
   * @param data zawartość formularza
   * @returns {Observable<Object>}
   */
  putZgloszonyUzytkownikZgloszenieUzytkownikow(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  /**
   * Metoda obsługująca żadanie get pobierająca informacjie o zgłoszeniach użytkowników
   * @returns {Observable<Object>}
   */
  getZgloszeniaUzytkownikow() {
    return this.http.get<any>(environment.restUrl + '/zgloszeniauzytkownikow?projection=verbose');
  }
}
