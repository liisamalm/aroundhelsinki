import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { WeatherService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  location = { cityId: 658225, unit: 'metric'};
  weather: any;
  iconLink: string = 'http://openweathermap.org/img/w/';


  constructor(public translate: TranslateService, public weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather(this.location.cityId, this.location.unit)
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


}
