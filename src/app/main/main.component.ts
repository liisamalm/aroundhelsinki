import { Activities } from './../interfaces/activities';
import { Component, OnInit } from '@angular/core';
import { LeafletEvent} from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places, Datum } from '../interfaces/places';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';
import { Events } from '../interfaces/events';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  events: Events[] = [];
  places: Places[] = [];
  activities: Activities[] = [];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;
  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545
  };
  showDistance = false;
  p: number = 1;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService) { }


  saveReferenceLocation(): void {
    MapComponent.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      this.referenceLocation = e.location;
      this.updateDistance();
      this.sortByDistance();
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
    return b;
  }

  updateDistance(){
    for(const place of this.places[0].data){
      place.distance = this.calculateDistance(place.location);
    }
  }

  sortByDistance(){
    this.places[0].data.sort((a,b) => a.distance - b.distance);
  }

  getPlacesAll(): void {
    this.apiService.getPlacesAll().subscribe((res: Places) => {
      this.places.push(res);
    });
  }
  getEventsAll(): void{
    this.apiService.getEventsAll().subscribe((res: Events) => {
      this.events.push(res);
    })
  }

  getActivitiesAll(): void{
    this.apiService.getActivitiesAll().subscribe((res: Activities) => {

      this.activities.push(res);
    })
  }

  ngOnInit(): void {
    this.getPlacesAll();
    this.getEventsAll();
    this.getActivitiesAll();
  }
}
