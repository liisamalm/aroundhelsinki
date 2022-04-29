import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  showPlace:boolean;

  constructor(){}

  setPlace(data:any) {
    this.showPlace = data;
    // console.log(this.showPlace);

  }

  getPlace(){
    console.log(this.showPlace);
    return this.showPlace;

  }
}


