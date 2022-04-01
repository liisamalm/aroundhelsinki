import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './marker.service';
import {TranslateService} from '@ngx-translate/core';
import { Places } from './places';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  // AfterViewInit,
  
  private map: L.Map;
  places: Places[] = [];
  closeResult: string = '';
  modalInfo : any;

  constructor(private markerService: MarkerService) { }
  

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [60.16952, 24.93545 ],
  //     zoom: 3
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 3,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  // }

  // ngAfterViewInit(): void {
  //   this.initMap();
  //   this.markerService.makePlaceMarkers(this.map);
  // }
  ngOnInit(): void {

    this.getAllPlaces();
   }

  getAllPlaces(): void{
    this.markerService.getAllPlaces().subscribe((res: Places) => {
      this.places.push(res);
      // this.places = res;
      console.log(this.places);

    });
  }


}
