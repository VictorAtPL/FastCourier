import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class OfertaService {

  constructor(private http: HttpClient) {
  }

  postOferta(data: any) {
    return this.http.post<any>(environment.restUrl + '/oferty', data);
  }

  getOferta(id: number) {
    return this.http.get<any>(environment.restUrl + '/oferty/' + id);
  }
}
