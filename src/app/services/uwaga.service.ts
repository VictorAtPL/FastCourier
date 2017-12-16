import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UwagaService {

  constructor(private http: HttpClient) {
  }

  postUwaga(data: any) {
    return this.http.post<any>(environment.restUrl + '/uwagi', data);
  }

  getUwagi() {
    return this.http.get<any>(environment.restUrl + '/uwagi');
  }
}
