import { Component, OnInit } from '@angular/core';
import { LeafletEvent} from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { faLocationCrosshairs, faPersonWalking, faCalendarCheck, faClone } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';
import { Events } from '../interfaces/events';
import { Activities } from '../interfaces/activities';
import { ShareService } from '../services/share.service';

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
  sortListByAsc: any = [];
  allList: any = [];

  showPlaces:boolean =false;
  showEvents:boolean = false;
  showActivities:boolean = false;
 

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
  showCheckbox = false;
  userAddress = false;
  type: any = [];
  sortedCollection: any[];
  typeName: any = [];

  constructor(
    private apiService: ApiService,
    public translate: TranslateService, private shareService: ShareService,
    ) {
    }


  saveReferenceLocation(): void {
    MapComponent.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      this.referenceLocation = e.location;
      this.sortListByAsc = this.allList;
      this.updateDistance();
      this.getAfterAddress();
      this.sortByDistance();
      this.userAddress = true;
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
      for(const type of this.sortListByAsc){
        type.distance = this.calculateDistance(type.location);
    }
  }

  sortByDistance(){
    this.sortListByAsc.sort((a: { distance: number; },b: { distance: number; }) => a.distance - b.distance);
}

  sortByAsc(){
    this.sortListByAsc.sort((a: { name: any; },b: { name: any; }) => a.name.fi - b.name.fi);
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
    this.showPlaces = this.shareService.getData().showPlace;
    this.showEvents = this.shareService.getData().showEvent;
    this.showActivities = this.shareService.getData().showActivity;
    this.showCheckbox = false;
    if(this.showPlaces == true && this.showEvents == true && this.showActivities == true){
      this.showCheckbox = true;
      this.sortListByAsc = [];
      this.apiService.getAll().subscribe((res: any) => {
        this.listPlaces = res[0];
        this.listEvents = res[1];
        this.listActivities = res[2];
        this.all  = [this.listPlaces, this.listEvents,  this.listActivities];
        for(let i=0; i<this.all.length; i++) {
            for(const type of this.all[i].data){
              this.sortListByAsc.push(type);
              this.arrays.push(type);
              this.allList.push(type);
            }
        }
      });
    }
    if(this.showPlaces == true && this.showEvents == false && this.showActivities == false){
      this.sortListByAsc = [];
      this.apiService.getPlacesAll().subscribe((res: Places) => {
        for(const type of res.data){
          this.sortListByAsc.push(type);
          this.arrays.push(type);
          this.allList.push(type);
        }
      });
    }
    if(this.showPlaces == false && this.showEvents == true && this.showActivities == false){
      this.sortListByAsc = [];

      this.apiService.getEventsAll().subscribe((res: any) => {
        for(const type of res.data){
          this.sortListByAsc.push(type);
          this.arrays.push(type);
          this.allList.push(type);
        }
      });
    }
    if(this.showPlaces == false && this.showEvents == false && this.showActivities == true){
      this.sortListByAsc = [];
      this.apiService.getActivitiesAll().subscribe((res: any) => {
        for(const type of res.data){
          this.sortListByAsc.push(type);
          this.arrays.push(type);
          this.allList.push(type);
        }
      });
    }
  }

  getAfterAddress(){
    this.tempArray = this.allList.filter((e:any) => e?.distance <= 2.5);
    this.sortListByAsc = [];
    this.newArray = [];
    this.newArray.push(this.tempArray);
    for(let i=0; i<this.newArray.length; i++) {
      for(const type of this.newArray[i]){
        this.sortListByAsc.push(type);
      }
    }
  }

  onChange(event: any) {
    if(event.target.checked && this.userAddress == false) {
      this.tempArray = this.arrays.filter((e:any) => e?.source_type.id == event.target.value);
      this.sortListByAsc = [];
      this.newArray.push(this.tempArray);
      for(let i=0; i<this.newArray.length; i++) {
        for(const type of this.newArray[i]){
          this.sortListByAsc.push(type);
        }
      }
    }else if(event.target.checked && this.userAddress == true) {
      this.tempArray = this.arrays.filter((e:any) => e?.source_type.id == event.target.value && e?.distance <= 2.5);
      this.sortListByAsc = [];
      this.newArray.push(this.tempArray);
      for(let i=0; i<this.newArray.length; i++) {
        for(const type of this.newArray[i]){
          this.sortListByAsc.push(type);
        }
      }
      this.sortByDistance();
    }else {
      this.tempArray = this.sortListByAsc.filter((e:any) => e?.source_type.id != event.target.value);
      this.sortListByAsc = [];
      this.newArray = [];
      this.newArray.push(this.tempArray);
      for(let i=0; i<this.newArray.length; i++) {
        for(const type of this.newArray[i]){
          this.sortListByAsc.push(type);
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
        titleEn: 'Places',
        titleSv: 'Platser',
        titleFi: 'Paikat',
        checked: true,
      },
      {
        id: 1,
        titleEn: 'Events',
        titleSv: 'Evenemanger',
        titleFi: 'Tapahtumat',
        checked: true,
      },
      {
        id: 3,
        titleEn: 'Activities',
        titleSv: 'Aktiviteter',
        titleFi: 'Aktiviteetit',
        checked: true,
      },

    ]
  }
}
