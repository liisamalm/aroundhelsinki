import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  showPlace: boolean;
  showEvent: boolean;
  showActivity: boolean;

  constructor() {}

  setPlace(place: any, event:any, activity:any) {
    this.showPlace = place;
    this.showEvent = event;
    this.showActivity = activity;
    // console.log(this.showPlace);
  }
  getPlace() {
    // console.log(this.showPlace);
    return {
      'showPlace': this.showPlace,
    'showEvent': this.showEvent,
    'showActivity': this.showActivity
    };
  }


  setEvent(data: any) {
    this.showEvent = data;
    // console.log(this.showPlace);
  }
  getEvent() {
    // console.log(this.showPlace);
    return this.showEvent;
  }

  setActivity(data: any) {
    this.showActivity = data;
    // console.log(this.showPlace);
  }
  getActivity() {
    // console.log(this.showPlace);
    return this.showActivity;
  }
}
