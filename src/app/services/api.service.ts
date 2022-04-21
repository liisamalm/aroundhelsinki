import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private externalApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getExternalAll(): Observable<any> {
    return this.http.get(`${this.externalApi}`);
  }

  public getOnePlace(id: any): Observable<any> {
    return this.http.get(this.externalApi + '/place/' + id);
  }

  httpPlaceMarker() {
    return this.http.get(this.externalApi);
  }
}
