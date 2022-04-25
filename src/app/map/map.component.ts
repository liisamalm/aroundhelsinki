import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  static map: L.Map;
  // static map: any;

  constructor() { }

  mapInit(){
    MapComponent.map = L.map('map', {
      center: [60.16952, 24.93545],
      zoom: 12,
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(MapComponent.map);
  }

  ngOnInit(): void {
    this.mapInit();
  }

}
