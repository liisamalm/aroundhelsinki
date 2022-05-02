import { Component, OnInit } from '@angular/core';
import { LeafletEvent} from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';
import { Events } from '../interfaces/events';
import { Activities } from '../interfaces/activities';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  places: Places[] = [];
  events: Events[] = [];
  activities: Activities[] = [];
  listPlaces: Places[] = [];
  listEvents: Events[] = [];
  listActivities: Activities[] = [];
  all: any;
  list: any[];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;
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

  //Places
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

  //Events

  getEventsAll(): void {
    this.apiService.getEventsAll().subscribe((res: Events) => {
      this.events.push(res);
    })
  }

  //Activities
  getActivitiesAll(): void {
    this.apiService.getActivitiesAll().subscribe((res: Activities) => {
      this.activities.push(res);
    })
  }




  getAll() {

    this.apiService.getAll().subscribe((res: any) => {
      this.listPlaces = res[0];
      this.listEvents = res[1];
      this.listActivities = res[2];
      this.all  = {listPlaces: this.listPlaces, listEvents: this.listEvents, listActivities: this.listActivities};
      console.log(this.all);
    });

  }





  ngOnInit(): void {
    this.getAll();
    this.getPlacesAll();
    this.getEventsAll();
    this.getActivitiesAll();
    this.list = [
      {
        id: 2,
        title: 'Places',
        checked: true,
      },
      {
        id: 1,
        title: 'Events',
        checked: false,
      },
      {
        id: 3,
        title: 'Activities',
        checked: false,
      },

    ]
  }
}
