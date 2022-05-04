
import { Component, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { PopupComponent } from '../popup/popup.component';
import { LeafletEvent, MarkerClusterGroup } from 'leaflet';
import { ApiService } from '../services/api.service';
import {
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  Type,
} from '@angular/core';
import { MainComponent } from '../main/main.component';
import 'leaflet.markercluster';
import { NavigationComponent } from '../navigation/navigation.component';
import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


// https://github.com/pointhi/leaflet-color-markers
const iconPlace = L.icon({
  iconUrl: '../assets/images/marker_place.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const iconEvent = L.icon({
  iconUrl: '../assets/images/marker_event.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const iconActivity = L.icon({
  iconUrl: '../assets/images/marker_activity.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  static map: L.Map;


  showPlaces:boolean =false;

 showEvents:boolean = false;

 showActivities:boolean = false;


  constructor(
    public apiService: ApiService,
    public mainComponent: MainComponent,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private shareService: ShareService,
    public translate: TranslateService,
    private route: ActivatedRoute

  ) {}


  mapInit() {
    MapComponent.map = L.map('map', {
      center: [60.16952, 24.93545],
      zoom: 12,
      zoomControl: false
    });

    L.control.zoom({
      position: 'topright'
  }).addTo(MapComponent.map);
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

  mainPageMap() {
    this.mapInit();
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      autoClose: true,

    });
    MapComponent.map.addControl(searchControl);
    this.mainComponent.saveReferenceLocation();
  }

  makeMapPopup(data: any, type: any): any {
    let markerPopup: any = this.compilePopup(PopupComponent, (c: any) => {
        (c.instance.nameEn = data.name.en),
        (c.instance.nameSv = data.name.sv),
        (c.instance.nameFi = data.name.fi),
        (c.instance.address = data.location.address.street_address),
        (c.instance.postalCode = data.location.address.postal_code),
        (c.instance.locality = data.location.address.locality),
        (c.instance.ownPage = data.id);
        (c.instance.type = type);
    });
    return markerPopup;
  }

  private compilePopup(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach) onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  ngOnInit() {
    this.mainPageMap();
    this.makeAllMarkers(MapComponent.map);

  }

  makeAllMarkers(map: L.Map){
    const markerCluster = new MarkerClusterGroup();
    this.showPlaces = this.shareService.getData().showPlace;
    this.showEvents = this.shareService.getData().showEvent;
    this.showActivities = this.shareService.getData().showActivity;


    if(this.showPlaces == true && this.showEvents == false && this.showActivities == false){
      this.apiService.getPlacesAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconPlace }).bindPopup(
            this.makeMapPopup(c, "place")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);



      });
    } else if(this.showPlaces == false && this.showEvents == true && this.showActivities == false) {
      this.apiService.getEventsAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconEvent }).bindPopup(
            this.makeMapPopup(c, "event")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);


      });
    } else if (this.showPlaces == false && this.showEvents == false && this.showActivities == true) {
      this.apiService.getActivitiesAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconActivity }).bindPopup(
            this.makeMapPopup(c, "activity")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);


      });
    } else {
      this.apiService.getPlacesAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconPlace }).bindPopup(
            this.makeMapPopup(c, "place")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);
      });
      this.apiService.getActivitiesAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconActivity }).bindPopup(
            this.makeMapPopup(c, "activity")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);
      });
      this.apiService.getEventsAll().subscribe((res: any) => {
        for (const c of res.data) {
          const lon = c.location.lon;
          const lat = c.location.lat;

          const marker = L.marker([lat, lon], { icon: iconEvent }).bindPopup(
            this.makeMapPopup(c, "event")
          );

          markerCluster.addLayer(marker);
        }
        map.addLayer(markerCluster);
      });
    }
  }
}
