import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private externalApi = 'https://aroundhelsinki-1652773931995.azurewebsites.net';

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

  // All in one

  getAll(): Observable<Object> {
    let allPlaces = this.http.get(this.externalApi + '/v1/places');
    let allEvents = this.http.get(this.externalApi + '/v1/events');
    let allActivities = this.http.get(this.externalApi + '/v1/activities');
    return forkJoin([allPlaces, allEvents, allActivities]);
  }
}
