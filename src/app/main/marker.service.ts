import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, of } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private externalApi = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

  getExternalAll():Observable<any> {

    return this.http.get(`${this.externalApi}`);
  }

  public getOnePlace(id:any):Observable<any>{

    return this.http.get(this.externalApi + "/place/" +  id);
  }

  httpPlaceMarker(){
    return this.http.get(this.externalApi);
  }
}
