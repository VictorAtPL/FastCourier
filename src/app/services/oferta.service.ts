import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()

/**
 * Klasa odpowiedzialna za pobieranie oferty z REST
 * @author Adrian Plichta
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 */
export class OfertaService {

  /**
   * Konstruktor powołujący nową instancję serwisu odpowiedzialnego za pobieranie/wysyłanie oferty do REST.
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
   *
   * @author Michał Pruchniewski
   * @param data
   * @returns {Observable<Object>}
   */
  postZgloszenieOferty(data: any) {
    return this.http.post<any>(environment.restUrl + '/zgloszeniaofert', data);
  }

  /**
   *
   * @author Michał Pruchniewski
   * @param {string} url
   * @param data
   * @returns {Observable<Object>}
   */
  putZgloszonaOfertaZgloszenieOfert(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  /**
   *
   * @author Michał Pruchniewski
   * @returns {Observable<Object>}
   */
  getZgloszeniaOfert() {
    return this.http.get<any>(environment.restUrl + '/zgloszeniaofert?projection=verbose');
  }

  /**
   * @author Piotr Podbielski
   * @returns {Observable<Object>} Obiekt typu observable zwracający wynik wykonania żądania HTTP, które pobiera listę ofert przez REST.
   */
  getOferty() {
    return this.http.get<any>(environment.restUrl + '/oferty?projection=verbose');
  }
}
