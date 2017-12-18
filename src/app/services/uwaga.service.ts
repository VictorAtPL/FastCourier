import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
/**
 * Klasa obowiedzialna za komunikację ze stroną
 * @author Michał Świerczewski
 * @since 0.0.3
 * @copyright Magical Solutions
 * @licence Creative Commons Attribution NonCommercial (CC-BY-NC)
 *
 */
export class UwagaService {

  /**
   * Pobranie danych klienta HTTP
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Wykonanie metody post
   * @param data
   * @returns {Observable<Object>}
   */
  postUwaga(data: any) {
    return this.http.post<any>(environment.restUrl + '/uwagi', data);
  }

  /**
   * Wykonanie metody get
   * @returns {Observable<Object>}
   */
  getUwagi() {
    return this.http.get<any>(environment.restUrl + '/uwagi');
  }
}
