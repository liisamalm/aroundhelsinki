import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LeafletEvent } from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import {
  faLocationCrosshairs,
  faPersonWalking,
  faCalendarCheck,
  faAnglesUp,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';
import { Events } from '../interfaces/events';
import { Activities } from '../interfaces/activities';
import { ShareService } from '../services/share.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  queries: {
    "tabsContentRef": new ViewChild("tabsContentRef")
  },
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  listPlaces: Places[] = [];
  listEvents: Events[] = [];
  listActivities: Activities[] = [];
  arrays: any = [];
  tempArray: any = [];
  newArray: any = [];
  sortList: any = [];
  allList: any = [];
  all: any;
  list: any[];

  showPlaces: boolean = true;
  showEvents: boolean = true;
  showActivities: boolean = true;
  
  faLocationCrosshairs = faLocationCrosshairs; // place
  faPersonWalking = faPersonWalking; // activity
  faCalendarCheck = faCalendarCheck; // event
  faAnglesUp = faAnglesUp;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545,
  };
  showDistance = false;
  showCheckbox = false;
  userAddress = false;
  p: number = 1;

  public tabsContentRef!: ElementRef;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private shareService: ShareService,
    private route: ActivatedRoute,
  ) { }

  saveReferenceLocation(): void {
    MapComponent.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      this.referenceLocation = e.location;
      this.sortList = this.allList;
      this.updateDistance();
      this.getAfterAddress();
      this.sortByDistance();
      this.userAddress = true;
      this.showDistance = true;
      this.scrollToTop();
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

  updateDistance() {
    for (const type of this.sortList) {
      type.distance = this.calculateDistance(type.location);
    }
  }

  sortByDistance() {
    this.sortList.sort(
      (a: { distance: number }, b: { distance: number }) =>
        a.distance - b.distance
    );
  }

  sortByAsc() {
    this.translate.currentLang == "en" ? this.sortList.sort(
      (a: { name: any }, b: { name: any }) => 0 - (a.name.en.trim() > b.name.en.trim() ? -1 : 1)) :
      this.translate.currentLang == "fi" ? this.sortList.sort(
        (a: { name: any }, b: { name: any }) => 0 - (a.name.fi.trim() > b.name.fi.trim() ? -1 : 1)) :
        this.sortList.sort(
          (a: { name: any }, b: { name: any }) => 0 - (a.name.sv.trim() > b.name.sv.trim() ? -1 : 1))
  }

  getPlacesAll(): void {
    this.apiService.getPlacesAll().subscribe((res: any) => {
      for (const type of res.data) {
        this.sortList.push(type);
        this.arrays.push(type);
        this.allList.push(type);
      }
    });
  }

  getEventsAll(): void {
    this.apiService.getEventsAll().subscribe((res: any) => {
      for (const type of res.data) {
        this.sortList.push(type);
        this.arrays.push(type);
        this.allList.push(type);
      }
    });
  }

  getActivitiesAll(): void {
    this.apiService.getActivitiesAll().subscribe((res: any) => {
      for (const type of res.data) {
        this.sortList.push(type);
        this.arrays.push(type);
        this.allList.push(type);
      }
    });
  }

  scrollToTop() {
    this.tabsContentRef.nativeElement.scrollTo(0, 0);
  }

  getAll() {
    this.showPlaces = this.shareService.getData().showPlace;
    this.showEvents = this.shareService.getData().showEvent;
    this.showActivities = this.shareService.getData().showActivity;
    this.showCheckbox = false;
    if (
      (this.showPlaces == true &&
        this.showEvents == true &&
        this.showActivities == true) ||
      this.route.snapshot.url[0]?.path === 'home'
    ) {
      this.showCheckbox = true;
      this.sortList = [];
      this.apiService.getAll().subscribe((res: any) => {
        this.listPlaces = res[0];
        this.listEvents = res[1];
        this.listActivities = res[2];
        this.all = [this.listPlaces, this.listEvents, this.listActivities];
        for (let i = 0; i < this.all.length; i++) {
          for (const type of this.all[i].data) {
            this.sortList.push(type);
            this.arrays.push(type);
            this.allList.push(type);
          }
        }
        this.sortByAsc();
      });
    }
    if (
      (this.showPlaces == true &&
        this.showEvents == false &&
        this.showActivities == false) ||
      this.route.snapshot.url[0]?.path === 'places'
    ) {
      this.sortList = [];
      this.getPlacesAll();
    }
    if (
      (this.showPlaces == false &&
        this.showEvents == true &&
        this.showActivities == false) ||
      this.route.snapshot.url[0]?.path === 'events'
    ) {
      this.sortList = [];
      this.getEventsAll();
    }
    if (
      (this.showPlaces == false &&
        this.showEvents == false &&
        this.showActivities == true) ||
      this.route.snapshot.url[0]?.path === 'activities'
    ) {
      this.sortList = [];
      this.getActivitiesAll();
    }
  }

  getAfterAddress() {
    this.tempArray = this.allList.filter((e: any) => e?.distance <= 2.5);
    this.sortList = [];
    this.newArray = [];
    this.newArray.push(this.tempArray);
    this.pushToList(this.newArray);
  }

  pushToList(list: any) {
    for (let i = 0; i < list.length; i++) {
      for (const type of list[i]) {
        this.sortList.push(type);
      }
    }
  }

  onChange(event: any) {
    if (event.target.checked && this.userAddress == false) {
      this.tempArray = this.arrays.filter(
        (e: any) => e?.source_type.id == event.target.value
      );
      this.sortList = [];
      this.newArray.push(this.tempArray);
      this.pushToList(this.newArray);
    } else if (event.target.checked && this.userAddress == true) {
      this.tempArray = this.arrays.filter(
        (e: any) =>
          e?.source_type.id == event.target.value && e?.distance <= 2.5
      );
      this.sortList = [];
      this.newArray.push(this.tempArray);
      this.pushToList(this.newArray);
      this.sortByDistance();
    } else {
      this.tempArray = this.sortList.filter(
        (e: any) => e?.source_type.id != event.target.value
      );
      this.sortList = [];
      this.newArray = [];
      this.newArray.push(this.tempArray);
      this.pushToList(this.newArray);
    }
  }

  zoomMap(location: any) {
    MapComponent.map.setView([location.lat, location.lon], 25);
  }

  ngOnInit(): void {
    this.getAll();
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
    ];
  }
}
