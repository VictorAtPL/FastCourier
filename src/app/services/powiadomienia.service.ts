import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class PowiadomieniaService {

  constructor(private http: HttpClient) {
  }

  postPowiadomienie(data: any) {
    return this.http.post<any>(environment.restUrl + '/powiadomienia', data);
  }

  putPowiadomienieUzytkownikaPowiadomienie(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  getPowiadomieniaUzytkownika(login: string) {
    return this.http.get<any>(environment.restUrl + '/uzytkownicy/' + login + '/powiadomienia', {
      params: {
        sort: ['dataDodania,desc']
      }
    });
  }

  patchPowiadomienia(id: number, data: any) {
    return this.http.patch(environment.restUrl + '/powiadomienia/' + id, data);
  }
}
