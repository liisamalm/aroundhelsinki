import { Component, OnInit } from '@angular/core';
import { LeafletEvent} from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { faLocationCrosshairs, faPersonWalking, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
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

  arrays: any = [];
  tempArray: any = [];
  newArray: any = [];
  sort: any = [];

  all: any;
  list: any[];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs; // place
  faPersonWalking = faPersonWalking; // activity
  faCalendarCheck = faCalendarCheck; // event
  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545
  };
  showDistance = false;
  type: any = [];

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
    for(let i=0; i<this.all.length; i++) {
      for(const place of this.all[i].data){
        place.distance = this.calculateDistance(place.location);
      }
    }
  }

  sortByDistance(){
    for(let i=0; i<this.all.length; i++) {
    this.all[i].data.sort((a: { distance: number; },b: { distance: number; }) => a.distance - b.distance);
  }
}

  getPlacesAll(): void {
    this.apiService.getPlacesAll().subscribe((res: Places) => {
      this.places.push(res);
    });
  }

  getEventsAll(): void {
    this.apiService.getEventsAll().subscribe((res: Events) => {
      this.events.push(res);
    })
  }

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

      this.all  = [this.listPlaces, this.listEvents,  this.listActivities];
      this.arrays = [this.listPlaces, this.listEvents,  this.listActivities];

    });


  }
  sortByAsc(){
    this.all[0].data[0].sort((a: any, b: any)=> a.name.fi.localeCompare(b.name.fi));
  }

  onChange(event: any) {
    if(event.target.checked) {
      this.tempArray = this.arrays.filter((e:any) => e.data[0].source_type.id == event.target.value);
      this.all = [];
      this.newArray.push(this.tempArray);
      for(let i=0; i<this.newArray.length; i++) {
        var firstArray = this.newArray[i];
        for(let i=0; i<firstArray.length; i++){
          var obj = firstArray[i];
          this.all.push(obj);
        }
      }
    } else {
      this.tempArray = this.all.filter((e:any) => e.data[0].source_type.id != event.target.value);
      this.newArray = [];
      this.all = [];
      this.newArray.push(this.tempArray);
      for(let i=0; i<this.newArray.length; i++) {
        var firstArray = this.newArray[i];
        for(let i=0; i<firstArray.length; i++){
          var obj = firstArray[i];
          this.all.push(obj);
        }
      }
    }
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
        checked: true,
      },
      {
        id: 3,
        title: 'Activities',
        checked: true,
      },

    ]
  }
}
