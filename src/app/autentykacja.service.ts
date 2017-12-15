import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AutentykacjaService {

  constructor(private http: HttpClient) {
  }

  weryfikuj(email: String, haslo: String) {
    return this.http.get<any>(environment.restUrl + '/uzytkownicy/' + email);
  }
}
