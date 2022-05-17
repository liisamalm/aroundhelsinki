import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

const iconEvent = L.icon({
  iconUrl: '../assets/images/marker_event.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  eventid: any;
  events: any;
  date: Date = new Date();
  faCheck = faCheck;
  faTimes = faTimes;
  newImageString: string = '';
  private map: L.Map;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneEvent();
    this.mapInit();
  }

  mapInit() {
    this.apiService.getOneEvent(this.eventid).subscribe((data) => {
      if (data.id == this.eventid) {
        this.map = L.map('map', {
          center: [this.events?.location.lat, this.events?.location.lon],
          zoom: 16,
        });
        const tiles = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            minZoom: 3,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        );
        tiles.addTo(this.map);
        const marker = L.marker(
          [this.events?.location.lat, this.events?.location.lon],
          { icon: iconEvent }
        );
        marker.addTo(this.map);
      }
    });
  }

  getOneEvent(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.eventid = params.get('id');
          return this.apiService.getOneEvent(this.eventid);
        })
      )
      .subscribe((data) => {
        if (data.id == this.eventid) {
          this.events = data;
        }
      });
  }

  changeImg(event: any) {
    this.newImageString = event.target.getAttribute('src');
    document
      .getElementById('view-img')
      ?.setAttribute('src', this.newImageString);
  }

  formatDate(date: any) {
    return moment.utc(date).format('DD/MM/YYYY');
  }
}
