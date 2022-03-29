import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
 /*  capitals: string = '/assets/data/usa-capitals.geojson'; */
  capitals: string = '/assets/data/places.json';

  constructor(private http: HttpClient) {
  }

  makeCapitalMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        /* const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1]; */
        const lon = c.data.location.lat;
        const lat = c.data.location.lon;
        const marker = L.marker([lat, lon]);
        
        marker.addTo(map);
      }
    });
  }
}