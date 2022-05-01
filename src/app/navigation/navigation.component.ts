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

  sendPlace(){
    // console.log(this.showPlace);
    this.showPlace = true;
    this.shareService.setPlace(this.showPlace);

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
