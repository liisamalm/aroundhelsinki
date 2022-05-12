import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../services/navigation.service';
import { ShareService } from '../services/share.service';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  location = { cityId: 658225, unit: 'metric' };
  weather: any;
  iconLink: string = 'http://openweathermap.org/img/w/';

  faBars = faBars;
  faTimes = faTimes;

  showPlace = false;

  showEvent = false;

  showActivity = false;
  openMenuIcon = document.querySelector(".open-menu");
  burgerMenu = document.querySelector(".burger-menu")
  closeMenuIcon = document.querySelector(".close-menu");




  constructor(public translate: TranslateService, public weatherService: WeatherService, private shareService: ShareService) { }

  ngOnInit() {
    this.getWeather(this.location.cityId, this.location.unit);
    this.hamMenu();
  }
  hamMenu(){
    console.log(this.openMenuIcon);
    this.openMenuIcon?.addEventListener("click", () => {
      this.burgerMenu?.classList.toggle('active');
  });

  this.closeMenuIcon?.addEventListener("click", () => {
      this.burgerMenu?.classList.toggle('active');
  });
  }



  getWeather(cityId: any, unit: string) {
    this.weatherService
      .getWeather(cityId, unit)
      .subscribe(res => {
        this.weather = res;
      });
  }

  getIcon(icon: string) {


    return `${this.iconLink}${icon}.png`;
  }

  sendPlace() {
    this.showPlace = true;
    this.showEvent = false;
    this.showActivity = false;
    this.shareService.setData(this.showPlace, this.showEvent, this.showActivity);

    return {
      'showPlace': this.showPlace,
      'showEvent': this.showEvent,
      'showActivity': this.showActivity
    };
  }
  sendAll() {
    this.showPlace = true;
    this.showEvent = true;
    this.showActivity = true;
    this.shareService.setData(this.showPlace, this.showEvent, this.showActivity);

    return {
      'showPlace': this.showPlace,
      'showEvent': this.showEvent,
      'showActivity': this.showActivity
    };
  }
  sendEvent() {
    this.showPlace = false;
    this.showEvent = true;
    this.showActivity = false;
    this.shareService.setData(this.showPlace, this.showEvent, this.showActivity);

    return {
      'showPlace': this.showPlace,
      'showEvent': this.showEvent,
      'showActivity': this.showActivity
    };
  }
  sendActivity() {
    this.showPlace = false;
    this.showEvent = false;
    this.showActivity = true;
    this.shareService.setData(this.showPlace, this.showEvent, this.showActivity);

    return {
      'showPlace': this.showPlace,
      'showEvent': this.showEvent,
      'showActivity': this.showActivity
    };
  }


}
