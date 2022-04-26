import { Component, OnInit } from '@angular/core';
import { LeafletEvent} from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { Events } from '../interfaces/events';
import { AllDTO, PlaceDTO, EventDTO } from '../interfaces/dtos';
import { faLocationCrosshairs, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  places: Places[] = [];
  events: Events[] = [];
  alldto: AllDTO[] = [];
  placedto: PlaceDTO[] = [];
  eventdto: EventDTO[] = [];
 
  closeResult: string = '';
  faLocationCrosshairs = faLocationCrosshairs;
  faCalendarCheck = faCalendarCheck;
  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545
  };
  showDistance = false;

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

  getExternalAll(): void {
    this.apiService.getExternalAllPlaces().subscribe((res: Places) => {
      this.places.push(res);
    });
  }

  getExternalAllEvents(): void {
    this.apiService.getExternalAllEvents().subscribe((res: Events ) => {
      this.events.push(res);
    });
  }

  addPlacesToPlaceDTO(){

  }

  addPlacesToEventDTO(){
    this.apiService.getExternalAllEvents().subscribe((res: Events ) => {
      this.eventdto[0].id = res.data[0].id;
      this.eventdto[0].name = res.data[0].name;
      this.eventdto[0].address.street_address = res.data[0].location.address.street_address;
      this.eventdto[0].address.postal_code = res.data[0].location.address.postal_code;
      this.eventdto[0].address.locality = res.data[0].location.address.locality;
      this.eventdto[0].name = res.data[0].name;
      this.eventdto[0].name = res.data[0].name;
      this.eventdto[0].name = res.data[0].name;

    });

  }

  ngOnInit(): void {
    this.getExternalAll();
    this.getExternalAllEvents();
  }
}
