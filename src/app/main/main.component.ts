import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletEvent } from 'leaflet';
import { MarkerService } from './marker.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from './places';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { Distance } from './distance';
import { placements } from '@popperjs/core';
import { getPopperClassPlacement } from '@ng-bootstrap/ng-bootstrap/util/positioning';

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
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit, OnInit {
  private map: L.Map;
  // public location: any = {
  //   x: 24.93545,
  //   y: 60.16952,
  //   label: 'test marker',
  // };
  places: Places[] = [];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;
  placeDistance: any;
  placesDists: Object;

  paikanEtaisyys: any[] = [];
  newDistances : Distance[] = [];

  // distance: Distance = {
  //   placeId: 0,
  //   length: 0,
  // };

  constructor(
    private markerService: MarkerService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fi', 'se']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|fi|se/) ? browserLang : 'en');
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [60.16952, 24.93545],
      zoom: 12,
    });

    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      autoClose: true,
    });
    this.map.addControl(searchControl);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
    this.getDistance();
  }


  getDistance(): void {
    this.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      const userY = e.location.y;
      const userX = e.location.x;
      let placeY = '';
      let placeX = '';
      this.markerService.getAllPlaces().subscribe((res: any) => {
        for (const c of res.data) {
          placeX = c.location.lon;
          placeY = c.location.lat;
          console.log('user locarion: ' + userX + ' ' + userY);
          console.log('placeX + placeY: ' + placeX + ' ' + placeY);

          let degrees = Math.PI / 180;
          let dLat = (parseFloat(placeY) - userY) * degrees;
          var dLon = (parseFloat(placeX) - userX) * degrees;
          var a =
            Math.pow(Math.sin(dLat / 2.0), 2) +
            Math.cos(userY * degrees) *
              Math.cos(userX * degrees) *
              Math.pow(Math.sin(dLon / 2.0), 2);
          var b = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          // console.log('Etäisyys ' + b + 'km');
          var getElement = document.getElementById('distance');
          if (getElement) {
            this.placeDistance = (b.toFixed(2));
            // console.log(this.placeDistance);
          }
          this.paikanEtaisyys.push(
             this.placeDistance
          );
          // console.log(this.paikanEtaisyys);

          this.newDistances = this.paikanEtaisyys;
          // console.log(this.newDistances);
          // console.log(this.newDistances[0]);
          // console.log(this.newDistances[0]);

          var arrayToString = JSON.stringify(Object.assign({}, this.newDistances));  
          var stringToJsonObject = JSON.parse(arrayToString); 

          // console.log(stringToJsonObject);
          this.placesDists = stringToJsonObject;
          console.log(this.placesDists);

        }

        // var newDistances : any[] = [];
        // newDistances = this.paikanEtaisyys;

        // console.log(newDistances);

        // var getElement = document.getElementById('distance');
        // for(let i = 0; i < newDistances.length; i++) {
        //   this.placeDistance = newDistances[i];
        //   console.log(this.placeDistance);
        //   getElement!.innerHTML = newDistances[i]
        // }




        // console.log(typeof this.paikanEtaisyys);
      });
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makePlaceMarkers(this.map);
  }

  ngOnInit(): void {
    this.getAllPlaces();
  }

  getAllPlaces(): void {
    this.markerService.getAllPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
}
