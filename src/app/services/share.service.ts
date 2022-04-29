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

  setPlace(data: any) {
    this.showPlace = data;
    // console.log(this.showPlace);
  }
  getPlace() {
    // console.log(this.showPlace);
    return this.showPlace;
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
