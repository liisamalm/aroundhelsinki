import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import {LeafletEvent} from 'leaflet';
import { MarkerService } from './marker.service';
import {TranslateService} from '@ngx-translate/core';
import { Places } from './places';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'

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
export class MainComponent implements AfterViewInit, OnInit{
  
  private map: L.Map;
  public location: any = {
    x: 24.93545, 
    y: 60.16952,
    label: 'test marker'
  };
  places: Places[] = [];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;

  constructor(private markerService: MarkerService, public translate: TranslateService) { 
    translate.addLangs(['en', 'fi', 'se']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|fi|se/) ? browserLang : 'en');

  }
  
  private initMap(): void {

    this.map = L.map('map', {
      center: [60.16952, 24.93545],
      zoom: 3,
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

    this.map.on('geosearch/showlocation', (e:  LeafletEvent|any) => {
      console.log("Y: " + e.location.y + "X: " + e.location.x);
    });
    
 
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makePlaceMarkers(this.map);
  }


  ngOnInit(): void {
    this.getAllPlaces();
   }

  getAllPlaces(): void{
    this.markerService.getAllPlaces().subscribe((res: Places) => {
    this.places.push(res);
    });
  }
}
