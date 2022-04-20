import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Places } from './places';
import { PopupComponent } from '../popup/popup.component';
import { Injector, ApplicationRef, ComponentFactoryResolver, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  places: string = '/assets/data/places.json';
  private externalApi = 'http://localhost:8080/places';

  constructor(private http: HttpClient,
              private resolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {

  }

  makeMapPopup(data: any): any{
    let markerPopup: any = this.compilePopup(PopupComponent, (c: any) => {
        (c.instance.place = data.name.fi),
        (c.instance.address = data.location.address.street_address),
        (c.instance.postalCode = data.location.address.postal_code),
        (c.instance.locality = data.location.address.locality),
        (c.instance.placeUrl = data.info_url)
      });
      return markerPopup;
  }

  makePlaceMarkers(map: L.Map): void {
    this.http.get(this.places).subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;
        const marker = L.marker([lat, lon]);

        marker.bindPopup(this.makeMapPopup(c));

        marker.addTo(map);
      }
    });
  }

  getExternalAll():Observable<any> {

    console.log (this.http.get(`${this.externalApi}`));
    return this.http.get(`${this.externalApi}`);

  }

  // getAllPlaces():Observable<Places> {
  //   return this.http.get<Places>(this.places);
  // }

  public getOnePlace(id:any):Observable<any>{
    return this.http.get(this.places, id)
  }


  private compilePopup(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }
}
