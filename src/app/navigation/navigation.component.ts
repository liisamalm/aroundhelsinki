import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../services/navigation.service';
import { ShareService } from '../services/share.service';



function hamMenu() {


  const navigation = {
    state : false,
    navi: document.querySelector("div#navi"),
    btn : document.querySelectorAll("div#navi fa-icon"),
    closeMenu : function( ) {
        this.navi?.setAttribute('data-active', String(false));
        this.state = false;
    },
    click : function(){
        let curretState = Boolean(this.navi?.getAttribute('data-active'));
        this.state = ( curretState != this.state );
        this.navi?.setAttribute('data-active',  String(this.state));
        console.log(this.navi)
    },
    init : function(){
        this.btn[0].addEventListener("click", ()=>{this.click()});
        this.btn[1].addEventListener("click", ()=>{this.click()});
        window.addEventListener('resize', function(){
            if( window.screen.width >= 767 ){ navigation.closeMenu();
             }
        });
    },

  }

}



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  location = { cityId: 658225, unit: 'metric' };
  weather: any;
  iconLink: string = 'http://openweathermap.org/img/w/';

  showPlace = false;
  showEvent = false;
  showActivity = false;

  faBars = faBars;
  faTimes = faTimes;
  constructor(public translate: TranslateService, public weatherService: WeatherService, private shareService: ShareService) {

   }

  ngOnInit() {
    this.getWeather(this.location.cityId, this.location.unit);
    hamMenu();
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
