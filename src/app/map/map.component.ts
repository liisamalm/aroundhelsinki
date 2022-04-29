import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { PopupComponent } from '../popup/popup.component';
import { LeafletEvent, MarkerClusterGroup } from 'leaflet';
import { ApiService } from '../services/api.service';
import { Injector, ApplicationRef, ComponentFactoryResolver, Type } from '@angular/core';
import { MainComponent } from '../main/main.component';
import 'leaflet.markercluster';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  static map: L.Map;


  constructor(public apiService: ApiService, public translate: TranslateService, public mainComponent: MainComponent, private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef, private injector: Injector, private route: ActivatedRoute) { }

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

  makeMapPopup(data: any): any {
    let markerPopup: any = this.compilePopup(PopupComponent, (c: any) => {
    
        /* (c.instance.place = (this.translate.currentLang == 'en' ? data.name.en : (this.translate.currentLang == 'fi' ? data.name.fi : data.name.sv))), */
        (c.instance.placeEn = data.name.en),
        (c.instance.placeSv = data.name.sv),
        (c.instance.placeFi = data.name.fi),
        (c.instance.address = data.location.address.street_address),
        (c.instance.postalCode = data.location.address.postal_code),
        (c.instance.locality = data.location.address.locality),
        (c.instance.placeUrl = data.info_url),
        (c.instance.ownPage = data.id)
    });
    return markerPopup;
  }

  

   /*  console.log("kieli "+ document.getElementById("translate")?.textContent); */
        /* (c.instance.place = this.translate.instant(this.translate.currentLang === 'en' ? data.name.en : (this.translate.currentLang === 'fi' ? data.name.fi : data.name.sv))), */
       /*  (c.instance.place = (this.translate.currentLang === 'en' ? data.name.en : (this.translate.currentLang === 'fi' ? data.name.fi : data.name.sv))), */
  
/*  tämän hetkinen koodi ottaa sen kielen, mikä on valittuna ekana ja puskee sen siihen popup ikkunaan. Kun vaihtaa kieltä, niin se koodi ei tällä hetkellä muuta sitä kieltä automaattisesti, koska sitä funktioa mihin koodi on kirjotettu, ei ajeta uudelleen, kun uusi kieli valitaan. Eli idea on oikein, mutta toteutustapa puutteellinen. */

  makePlaceMarkers(map: L.Map) {
    const markerCluster = new MarkerClusterGroup();
    this.apiService.httpPlaceMarker().subscribe((res: any) => {
      for (const c of res.data) {
        const lon = c.location.lon;
        const lat = c.location.lat;
        const marker = L.marker([lat, lon], { icon: iconDefault }).bindPopup(this.makeMapPopup(c));
        markerCluster.addLayer(marker);
      }
      map.addLayer(markerCluster);
    });
  }

  private compilePopup(component: any, onAttach: any): any {
    const compFactory: any = this.resolver.resolveComponentFactory(component);
    let compRef: any = compFactory.create(this.injector);

    if (onAttach)
      onAttach(compRef);

    this.appRef.attachView(compRef.hostView);
    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  ngOnInit(): void {
    this.mainPageMap();
    this.makePlaceMarkers(MapComponent.map);
  }
}
