import { Component, OnInit } from "@angular/core";
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'my-app',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AppComponent implements OnInit {
  public location: any = {
    x: 105.780128,
    y: 21.029356,
    label: '15 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội'
  };

  ngOnInit() {
    this.initMap();
  }

  ////////////// MAP leaflet ///////////////
  public initMap(): void {
    // refresh map id
    document.getElementById(
      "contain-map"
    )!.innerHTML = `<div id='map' style='width: 100%; height: 100%;'></div>`;
    // init map
    const map = L.map("map", {
      // Set latitude and longitude of the map center (required)
      center: [this.location.y, this.location.x],
      // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
      zoom: 16
    });
    // add icon
    L.icon({
      iconUrl: "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/24/Map-Marker-Marker-Outside-Chartreuse-icon.png",
      // shadowUrl: 'assets/images/icons/Blank.png',
      iconSize: [25, 41], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      iconAnchor: [9, 40], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
    });
    L.control.scale().addTo(map);
    // Create a Tile Layer and add it to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright"></a> contributors'
    }).addTo(map);

    // add search control https://github.com/smeijer/leaflet-geosearch
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoClose: true
    });
    map.addControl(searchControl);

    // popover
    let marker = L.marker([this.location.y, this.location.x])
      .addTo(map)
      .bindPopup(this.location.label)
      .openPopup();

    // handler
    map.on("geosearch/showlocation", e => {
      if (marker) {
        // check
        map.removeLayer(marker); // remove
      }
      marker = new L.Marker([e.location.y, e.location.x])
        .addTo(map)
        .bindPopup(e.location.label)
        .openPopup();
    });
  }
}




// import { Component, AfterViewInit, OnInit } from '@angular/core';
// import * as L from 'leaflet';
// import { MarkerService } from './marker.service';
// import {TranslateService} from '@ngx-translate/core';
// import { OpenStreetMapProvider } from 'leaflet-geosearch';

// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//   iconRetinaUrl,
//   iconUrl,
//   shadowUrl,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   tooltipAnchor: [16, -28],
//   shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.css']
// })
// export class MainComponent implements AfterViewInit {
//   private map: L.Map;

//   closeResult: string = '';
//   modalInfo : any;

//   constructor(private markerService: MarkerService) { }


//   private initMap(): void {
//     this.map = L.map('map', {
//       center: [60.16952, 24.93545 ],
//       zoom: 3
//     });

//     const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       minZoom: 3,
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     });

//     tiles.addTo(this.map);
//   }

//   ngAfterViewInit(): void {
//     this.initMap();
//     this.markerService.makePlaceMarkers(this.map);
//   }
// }
