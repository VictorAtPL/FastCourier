import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * Klasa odpowiedzialna za pobieranie oferty z REST
 * @author Przemysław Proczek
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
@Injectable()
export class TransakcjaService {

  /**
   * Konstruktor wstrzykujący usługi z których można potem korzystać w komponencie.
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Metoda odpowiedzialna za wgranie nowej oferty do REST.
   * @param data
   * @returns {Observable<Object>}
   */
  postTransakcja(data: any) {
    return this.http.post<any>(environment.restUrl + '/transakcja', data);
  }

  /**
   * Metoda odpowiedzialna za pobranie danej oferty z REST.
   * @param {number} id
   * @returns {Observable<Object>}
   */
  getTransakcja(id: number) {
    return this.http.get<any>(environment.restUrl + '/transakcja/' + id);
  }

  patchTransakcja(id: number, data: any) {
    return this.http.patch(environment.restUrl + '/transakcja/' + id, data);
  }

  /**
   * Metoda wstawiająca zgłoszenie oferty
   * @author Michał Pruchniewski
   * @param data
   * @returns {Observable<Object>}
   */
  postZgloszenieTransakcji(data: any) {
    return this.http.post<any>(environment.restUrl + '/transakcje', data);
  }

  /**
   * Metoda zapisujące daną ofertę w zgłoszeniach ofert
   * @author Michał Pruchniewski
   * @param {string} url
   * @param data
   * @returns {Observable<Object>}
   */
  putZgloszonaTransakcjaZgloszenieTransakcji(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  /**
   * Metoda pobierająca zgłoszenia ofert
   * @author Michał Pruchniewski
   * @returns {Observable<Object>}
   */
  getZgloszeniaTransakcji() {
    return this.http.get<any>(environment.restUrl + '/zgloszeniatransakcji?projection=verbose');
  }

  patchZgloszenieTransakcji(id: number, data: any) {
    return this.http.patch(environment.restUrl + '/zgloszeniatransakcji/' + id, data);
  }

  /**
   * Funkcja pobierająca oferty z usługi REST
   * @author Piotr Podbielski
   * @returns {Observable<Object>} Obiekt typu observable zwracający wynik wykonania żądania HTTP, które pobiera listę ofert przez REST.
   */
  getTransakcji() {
    return this.http.get<any>(environment.restUrl + '/transakcje?projection=verbose');
  }

  getTransakcjiUzytkownika(login: string) {
    return this.http.get<any>(environment.restUrl + '/uzytkownicy/' + login + '/transakcje', {
      params: {
        sort: ['dataWyjazdu,desc', 'godzinaWyjazdu,desc']
      }
    });
  }

  /**
   * Funkcja łącząca ofertę z użytkownikiem poprzez usługę REST
   * @author Piotr Podbielski
   * @param {string} url adres url do endpointa któremu przekazujemy listę użytkowników, którzy mają być spięci z daną ofertą
   * @param data lista użytkowników, którzy mają być spięci z daną ofertą
   * @returns {Observable<Object>}
   */
  postUzytkownikTransakcjiTransakcja(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  postZlecenieTransportu(data: any) {
    return this.http.post<any>(environment.restUrl + '/transakcje', data);
  }

  putDotyczyTransakcjiZlecenieTransportu(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  putZlecajacyUzytkownikZlecenieTransportu(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  getZlecenie(id: number) {
    return this.http.get<any>(environment.restUrl + '/transakcje/' + id);
  }

  patchZlecenie(id: number, data: any) {
    return this.http.patch(environment.restUrl + '/transakcje/' + id, data);
  }

  getZlecenia() {
    return this.http.get<any>(environment.restUrl + '/transakcje');
  }
}
