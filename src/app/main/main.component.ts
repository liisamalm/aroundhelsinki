import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletEvent, MarkerClusterGroup } from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { Injector, ApplicationRef, ComponentFactoryResolver, Type } from '@angular/core';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit, OnInit {
  private map = MapComponent.map;

  places: Places[] = [];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;
  placeDistance: any;
  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545
  };
  showDistance = false;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }


  saveReferenceLocation(): void {
    this.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      this.referenceLocation = e.location;
      this.showDistance = true;
    });
  }

  calculateDistance(placeLocation: any) {
    const userY = this.referenceLocation.y;
    const userX = this.referenceLocation.x;
    let placeX = placeLocation.lon;
    let placeY = placeLocation.lat;

    let degrees = Math.PI / 180;
    let dLat = (parseFloat(placeY) - userY) * degrees;
    var dLon = (parseFloat(placeX) - userX) * degrees;
    var a =
      Math.pow(Math.sin(dLat / 2.0), 2) +
      Math.cos(userY * degrees) *
      Math.cos(userX * degrees) *
      Math.pow(Math.sin(dLon / 2.0), 2);
    var b = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    this.placeDistance = b.toFixed(2);
    return this.placeDistance;
  }

  ngAfterViewInit(): void {
    this.saveReferenceLocation();
  }

  ngOnInit(): void {
    this.getExternalAll();
  }

  getExternalAll(): void {
    this.apiService.getExternalAll().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
}
