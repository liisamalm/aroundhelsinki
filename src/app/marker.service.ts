import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Modal } from './map/modal';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  places: string = '/assets/data/places.json';
  placeData: Modal[];

  constructor(private http: HttpClient) {
  }

  makeMapPopup(data: any): any{ 
    // this.placeData = data;
    // console.log(this.placeData);
    // return this.placeData;

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


    // return  data.name.fi + "<br/>" + data.location.address.street_address + " " + data.location.address.postal_code + " " + data.location.address.locality + "<br/>" + data.opening_hours.hours[0].weekday_id + "<br/>" + data.opening_hours.hours[0].opens + "<br/>" + data.opening_hours.hours[0].closes + "<br/>" + data.opening_hours.hours[0].open24h;
    
  //   "weekday": {
  //     "weekday_id[1]": hours.weekday.monday,

  //     "tuesday": "Tiistai",
  //     "wednesday": "Keskiviikko",
  //     "thursday": "Torstai",
  //     "friday": "Perjantai",
  //     "saturday": "Lauantai",
  //     "sunday": "Sunnuntai"
  // }

  /*pitää käydä läpi opening_hours hours lista ja eka on maanantai, toka tiistai jne. Ota vinkkiä tuoteluettelosta*/

 
