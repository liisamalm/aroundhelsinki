import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { TranslateService } from '@ngx-translate/core';

const iconActivity = L.icon({
  iconUrl: '../assets/images/marker_activity.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
})
export class ActivityDetailComponent implements OnInit {
  activityid: any;
  activities: any;
  date: Date = new Date();
  faCheck = faCheck;
  faTimes = faTimes;
  link: string = '';
  newImageString: string = '';
  private map: L.Map;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.link = 'https://edit.myhelsinki.fi/sites/default/files/styles';
  }

  ngOnInit(): void {
    this.getOneActivity();
    this.mapInit();
  }

  mapInit() {
    this.apiService.getOneActivity(this.activityid).subscribe((data) => {
      if (data.id == this.activityid) {
        this.map = L.map('map', {
          center: [
            this.activities?.location.lat,
            this.activities?.location.lon,
          ],
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
          [this.activities?.location.lat, this.activities?.location.lon],
          { icon: iconActivity }
        );
        marker.addTo(this.map);
      }
    });
  }

  getOneActivity(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.activityid = params.get('id');
          return this.apiService.getOneActivity(this.activityid);
        })
      )
      .subscribe((data) => {
        if (data.id == this.activityid) {
          this.activities = data;
        }
      });
  }

  changeImg(event: any) {
    this.newImageString = event.target.getAttribute('src');
    document
      .getElementById('view-img')
      ?.setAttribute('src', this.newImageString);
  }
}
