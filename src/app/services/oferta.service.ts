import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

/**
 * Klasa usługi odpowiedzialnej za kontakt z serwisem REST w dziedzinie ofert
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
   *
   * @author Przemysław Proczek
   * @param data
   * @returns {Observable<Object>}
   */
  postOferta(data: any) {
    return this.http.post<any>(environment.restUrl + '/oferty', data);
  }

  /**
   *
   * @author Adrian Plichta
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
