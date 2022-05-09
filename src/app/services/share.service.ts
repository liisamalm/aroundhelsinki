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

  setData(place: any, event:any, activity:any) {
    this.showPlace = place;
    this.showEvent = event;
    this.showActivity = activity;
  }
  getData() {
    return {
      'showPlace': this.showPlace,
    'showEvent': this.showEvent,
    'showActivity': this.showActivity
    };
  }



}
