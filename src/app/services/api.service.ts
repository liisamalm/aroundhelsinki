import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private externalApi = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  //Places
  getPlacesAll(): Observable<any> {
    return this.http.get(this.externalApi + '/v1/places');
  }

  public getOnePlace(id: any): Observable<any> {
    return this.http.get(this.externalApi + '/place/' + id);
  }

  //Events
  getEventsAll(): Observable<any> {
    return this.http.get(this.externalApi + '/v1/events');
  }

  public getOneEvent(id: any): Observable<any> {
    return this.http.get(this.externalApi + '/event/' + id);
  }

  //Activities
  getActivitiesAll(): Observable<any> {
    return this.http.get(this.externalApi + '/v1/activities');
  }

  public getOneActivity(id: any): Observable<any> {
    return this.http.get(this.externalApi + '/activity/' + id);
  }

}
