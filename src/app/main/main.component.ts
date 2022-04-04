// import { Component, OnInit } from "@angular/core";
// import * as L from 'leaflet';
// import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent implements OnInit {
//   public location = {
//     x: 24.945831,
//     y: 60.167059,
//     label: 'Helsinki, Finland'
//   };

//   ngOnInit() {
//     this.initMap();
//   }

//   public initMap(): void {
//     document.getElementById(
//       "contain-map"
//     )!.innerHTML = `<div id='map' style='max-width: 1140px; height: 100%;'></div>`;
//     const map = L.map("map", {
//       center: [this.location.y, this.location.x],
//       zoom: 16
//     });
//     L.icon({
//       iconUrl: "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png",
//       iconSize: [25, 41],
//       iconAnchor: [9, 40],
//       popupAnchor: [0, -40]
//     });
//     L.control.scale().addTo(map);
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; <a href="http://osm.org/copyright"></a> contributors'
//     }).addTo(map);

//     const provider = new OpenStreetMapProvider();
//     const searchControl = new (GeoSearchControl as any)({provider: provider, autoClose: true}) ;
//     map.addControl(searchControl);

//     let marker = L.marker([this.location.y, this.location.x])
//       .addTo(map)
//       .bindPopup(this.location.label)
//       .openPopup();

//     map.on("geosearch/showlocation", (e) => {
//       console.log(e);
//       if (marker) {
//         map.removeLayer(marker); 
//       }
//     });
//   }

 
// }




import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './marker.service';
import {TranslateService} from '@ngx-translate/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

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
export class MainComponent implements AfterViewInit {
  private map: L.Map;

  closeResult: string = '';
  modalInfo : any;

  constructor(private markerService: MarkerService) { }


  private initMap(): void {
    this.map = L.map('map', {
      center: [60.16952, 24.93545 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makePlaceMarkers(this.map);
  }
}
