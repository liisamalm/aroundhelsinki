import { Component, OnInit } from '@angular/core';
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

// https://github.com/pointhi/leaflet-color-markers
const iconPlace = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const iconEvent = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const iconActivity = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
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

  constructor(
    public apiService: ApiService,
    public mainComponent: MainComponent,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  mapInit() {
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

  makeMapPopup(data: any): any {
    let markerPopup: any = this.compilePopup(PopupComponent, (c: any) => {
      (c.instance.place = data.name.fi),
        (c.instance.address = data.location.address.street_address),
        (c.instance.postalCode = data.location.address.postal_code),
        (c.instance.locality = data.location.address.locality),
        (c.instance.placeUrl = data.info_url),
        (c.instance.ownPage = data.id);
    });
    return markerPopup;
  }

  makePlaceMarkers(map: L.Map) {
    const markerCluster = new MarkerClusterGroup();
    this.apiService.httpPlaceMarker().subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;

        const marker = L.marker([lat, lon], { icon: iconPlace }).bindPopup(
          this.makeMapPopup(c)
        );

        markerCluster.addLayer(marker);
      }
      map.addLayer(markerCluster);
    });
  }

  makeActivityMarkers(map: L.Map) {
    const markerCluster = new MarkerClusterGroup();
    this.apiService.httpActivityMarker().subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;

        const marker = L.marker([lat, lon], { icon: iconActivity }).bindPopup(
          this.makeMapPopup(c)
        );

        markerCluster.addLayer(marker);
      }
      map.addLayer(markerCluster);
    });
  }

  makeEventMarkers(map: L.Map) {
    const markerCluster = new MarkerClusterGroup();
    this.apiService.httpEventMarker().subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;

        const marker = L.marker([lat, lon], { icon: iconEvent }).bindPopup(
          this.makeMapPopup(c)
        );

        markerCluster.addLayer(marker);
      }
      map.addLayer(markerCluster);
    });
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

  ngOnInit(): void {
    this.mainPageMap();
    this.makePlaceMarkers(MapComponent.map);
    this.makeActivityMarkers(MapComponent.map);
    this.makeEventMarkers(MapComponent.map);
  }
}
