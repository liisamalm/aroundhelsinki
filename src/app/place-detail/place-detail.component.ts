import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { LeafletEvent } from 'leaflet';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
})
export class PlaceDetailComponent implements OnInit, AfterViewInit {
  placeid: any;
  places: any;
  date: Date = new Date();
  faCheck = faCheck;
  faTimes = faTimes;
  link: string = '';
  newImageString: string = '';

  private map: L.Map;


  private initMap(): void {
    this.map = L.map('map', {
      center: [60.168922424316406, 24.94364356994629],
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
    L.marker([60.168922424316406, 24.94364356994629])
      .addTo(this.map)
      .bindPopup('Place Name')
      .openPopup();

    tiles.addTo(this.map);
  }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.link = 'https://edit.myhelsinki.fi/sites/default/files/styles';
  }
  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    this.getOnePlace();
  }

  getOnePlace(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.placeid = params.get('id');

          return this.apiService.getOnePlace(this.placeid);
        })
      )
      .subscribe((data) => {
        if (data.id == this.placeid) {
          this.places = data;
        }
        this.getMap(this.places?.location.lat, this.places?.location.lon);
      });
  }

  getImageUrl(link2: string) {
    var linklast = link2?.slice(68, 1000);
    var imglink = `${this.link}/hero_image/${linklast}`;
    return imglink;
  }

  changeImg(event: any) {
    this.newImageString = event.target.getAttribute('src');
    document
      .getElementById('view-img')
      ?.setAttribute('src', this.newImageString);
  }

  getMap(placeLat: any, placeLon: any) {
    var coordinate = [];
    coordinate.push(placeLat);
    coordinate.push(placeLon);
    console.log(coordinate);
    return coordinate;
  }
}
