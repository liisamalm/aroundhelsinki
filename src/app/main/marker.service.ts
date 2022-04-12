import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Observable, of } from 'rxjs';
import { Places } from './places';
import { PopupComponent } from '../popup/popup.component';
import { Injector, ApplicationRef, ComponentFactoryResolver, Type } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  places: string = '/assets/data/places.json';

  constructor(private http: HttpClient,
              private resolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  makeMapPopup(data: any): any{ 
    let markerPopup: any = this.compilePopup(PopupComponent, 
      (c: { instance: { paikka: Places; }; }) => {c.instance.paikka = data.location.address});
    return markerPopup;

    /* (c: { instance: { customText: string; }; }) => {c.instance.customText = 'Jokaisen paikan tiedot'}); */
  }
  /* makeMapPopup(data: any): any{ 
    return `` +
    `<div>${ data.name.fi }</div>` +
    `<div>${ data.location.address.street_address } ${ data.location.address.postal_code } ${ data.location.address.locality } </div>` +
    `<div>${ data.opening_hours.hours[0].weekday_id } ${ data.opening_hours.hours[0].opens } ${ data.opening_hours.hours[0].closes } ${ data.opening_hours.hours[0].open24h }</div>`
  } */


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
  /* makePlaceMarkers(map: L.Map): void {
    this.http.get(this.places).subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;
        const marker = L.marker([lat, lon]);
      
        marker.bindPopup(this.makeMapPopup(c));

        marker.addTo(map);
      }
    });
  } */

  getAllPlaces():Observable<Places> {
    return this.http.get<Places>(this.places);
  }


 // * Builds the referenced component so it can be injected into the 
  // * leaflet map as popup.

  private compilePopup(component: Type<unknown>, onAttach: { (c: any): void; (arg0: any): void; }): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    // onAttach allows you to assign 
    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
    
    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }
  /* private compilePopup(component: Type<unknown>, onAttach: { (c: any): void; (arg0: any): void; }): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    // onAttach allows you to assign 
    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));
    
    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  } */
}
