import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

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

  postZgloszenieUzytkownika(data: any) {
    return this.http.post<any>(environment.restUrl + '/zgloszeniauzytkownikow', data);
  }

  putZgloszonyUzytkownikZgloszenieUzytkownikow(url: string, data: any) {
    return this.http.put<any>(url, data, {headers: {'Content-Type': 'text/uri-list'}});
  }

  getZgloszeniaUzytkownikow() {
    return this.http.get<any>(environment.restUrl + '/zgloszeniauzytkownikow?projection=verbose');
  }
}