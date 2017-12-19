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
export class OfertaService {

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
  postOferta(data: any) {
    return this.http.post<any>(environment.restUrl + '/oferty', data);
  }

  /**
   * Metoda odpowiedzialna za pobranie danej oferty z REST.
   * @param {number} id
   * @returns {Observable<Object>}
   */
  getOferta(id: number) {
    return this.http.get<any>(environment.restUrl + '/oferty/' + id);
  }

  /**
   * Metoda wstawiająca zgłoszenie oferty
   * @author Michał Pruchniewski
   * @param data
   * @returns {Observable<Object>}
   */
  postZgloszenieOferty(data: any) {
    return this.http.post<any>(environment.restUrl + '/zgloszeniaofert', data);
  }

  /**
   * Metoda zapisujące daną ofertę w zgłoszeniach ofert
   * @author Michał Pruchniewski
   * @param {string} url
   * @param data
   * @returns {Observable<Object>}
   */
  putZgloszonaOfertaZgloszenieOfert(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  /**
   * Metoda pobierająca zgłoszenia ofert
   * @author Michał Pruchniewski
   * @returns {Observable<Object>}
   */
  getZgloszeniaOfert() {
    return this.http.get<any>(environment.restUrl + '/zgloszeniaofert?projection=verbose');
  }

  /**
   * Funkcja pobierająca oferty z usługi REST
   * @author Piotr Podbielski
   * @returns {Observable<Object>} Obiekt typu observable zwracający wynik wykonania żądania HTTP, które pobiera listę ofert przez REST.
   */
  getOferty() {
    return this.http.get<any>(environment.restUrl + '/oferty?projection=verbose');
  }

  /**
   * Funkcja łącząca ofertę z użytkownikiem poprzez usługę REST
   * @author Piotr Podbielski
   * @param {string} url adres url do endpointa któremu przekazujemy listę użytkowników, którzy mają być spięci z daną ofertą
   * @param data lista użytkowników, którzy mają być spięci z daną ofertą
   * @returns {Observable<Object>}
   */
  postUzytkownikOfertyOferta(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }
}
