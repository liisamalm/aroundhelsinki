import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  places: string = '/assets/data/places.json';

  constructor(private http: HttpClient) {
  }

  makeMapPopup(data: any): any{ 
    return `` +
    `<div>Place: ${ data.name.fi }</div>` +
    `<div>Address: ${ data.location.address.street_address } ${ data.location.address.postal_code } ${ data.location.address.locality } </div>` +
    `<div>Opening Hours: ${ data.opening_hours.hours[0].weekday_id } ${ data.opening_hours.hours[0].opens } ${ data.opening_hours.hours[0].closes } ${ data.opening_hours.hours[0].open24h }</div>`
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
 
}