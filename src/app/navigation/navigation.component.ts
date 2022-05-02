import { MapComponent } from './../map/map.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { WeatherService } from '../services/navigation.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  location = { cityId: 658225, unit: 'metric'};
  weather: any;
  iconLink: string = 'http://openweathermap.org/img/w/';



  showPlace = false;

  showEvent = false;

  showActivity = false;


  constructor(public translate: TranslateService, public weatherService: WeatherService, private shareService: ShareService) { }

  ngOnInit() {
    this.getWeather(this.location.cityId, this.location.unit);
    // this.shareService.setPlace(this.showPlace);
    // this.shareService.setEvent(this.showEvent);
    // this.shareService.setActivity(this.showActivity);
  }

  getWeather(cityId: any, unit: string) {
    this.weatherService
      .getWeather(cityId,unit)
      .subscribe(res => {
        this.weather = res;
      });
  }

  getIcon(icon:string) {


    return `${this.iconLink}${icon}.png`;
  }

  sendPlace(place:any, event:any, activity:any){
    // console.log(this.showPlace);
    this.showPlace = true;
    place = this.showPlace;
    this.showEvent = false;
    event = this.showEvent;
    this.showActivity = false;
    activity = this.showActivity;
    this.shareService.setPlace(place,event,activity);

    return this.showPlace;
  }
  sendEvent(){
    this.showEvent = true;
    this.shareService.setEvent(this.showEvent);

   return this.showEvent;
  }
  sendActivity(){
    this.showActivity = true;
    this.shareService.setActivity(this.showActivity);

    return this.showActivity;
  }


}
