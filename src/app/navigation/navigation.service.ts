import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = '653ec38ccc56d254339a1c306706156a';
  URI: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?id=`;
  }

  getWeather(cityId: string, unit: string) {
    return this.http.get(`${this.URI}${cityId}&appid=${this.apiKey}&units=${unit}`);
  }
}
