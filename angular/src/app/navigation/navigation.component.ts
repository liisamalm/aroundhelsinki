import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WeatherService } from '../services/navigation.service';
import { ShareService } from '../services/share.service';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
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
  @Output() list: any;

  constructor(public translate: TranslateService, public weatherService: WeatherService, private shareService: ShareService) { }

  ngOnInit() {
    this.getWeather(this.location.cityId, this.location.unit);
    this.hamMenu();
  }
  hamMenu() {
    const openMenuIcon = document.querySelector(".open-menu");
    const burgerMenu = document.querySelector(".burger-menu")
    const closeMenuIcon = document.querySelector(".close-menu");
    console.log(openMenuIcon);
    console.log(burgerMenu);
    console.log(burgerMenu?.childNodes[0]);
    console.log(closeMenuIcon);
    openMenuIcon?.addEventListener("click", () => {

      burgerMenu?.classList.toggle('active');
      console.log('button clicked');
    });

    closeMenuIcon?.addEventListener("click", () => {
      burgerMenu?.classList.toggle('active');
    });
  }

 clickLang(lang: any): any{
  this.list = lang == "en" ? MainComponent.sortInNav.sort(
      (a: { name: any }, b: { name: any }) => 0 - (a.name.en > b.name.en ? -1 : 1)) : 
      lang == "fi" ? MainComponent.sortInNav.sort(
        (a: { name: any }, b: { name: any }) => 0 - (a.name.fi > b.name.fi ? -1 : 1)) : 
        MainComponent.sortInNav.sort(
          (a: { name: any }, b: { name: any }) => 0 - (a.name.se > b.name.se ? -1 : 1));
    
}
  getWeather(cityId: any, unit: string) {
    this.weatherService.getWeather(cityId, unit).subscribe((res) => {
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
    this.shareService.setData(
      this.showPlace,
      this.showEvent,
      this.showActivity
    );

    return {
      showPlace: this.showPlace,
      showEvent: this.showEvent,
      showActivity: this.showActivity,
    };
  }
  sendAll() {
    this.showPlace = true;
    this.showEvent = true;
    this.showActivity = true;
    this.shareService.setData(
      this.showPlace,
      this.showEvent,
      this.showActivity
    );

    return {
      showPlace: this.showPlace,
      showEvent: this.showEvent,
      showActivity: this.showActivity,
    };
  }
  sendEvent() {
    this.showPlace = false;
    this.showEvent = true;
    this.showActivity = false;
    this.shareService.setData(
      this.showPlace,
      this.showEvent,
      this.showActivity
    );

    return {
      showPlace: this.showPlace,
      showEvent: this.showEvent,
      showActivity: this.showActivity,
    };
  }
  sendActivity() {
    this.showPlace = false;
    this.showEvent = false;
    this.showActivity = true;
    this.shareService.setData(
      this.showPlace,
      this.showEvent,
      this.showActivity
    );

    return {
      showPlace: this.showPlace,
      showEvent: this.showEvent,
      showActivity: this.showActivity,
    };
  }
}