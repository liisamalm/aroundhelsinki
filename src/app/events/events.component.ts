import { Component, OnInit } from '@angular/core';
import { LeafletEvent } from 'leaflet';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Places } from '../interfaces/places';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import { MapComponent } from '../map/map.component';
import 'leaflet.markercluster';
import { Events } from '../interfaces/events';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Events[] = [];
  closeResult: string = '';
  modalInfo: any;
  faLocationCrosshairs = faLocationCrosshairs;
  placeDistance: any;
  referenceLocation: any = {
    y: 60.16952,
    x: 24.93545,
  };
  showDistance = false;

  constructor(
    private apiService: ApiService,
    public translate: TranslateService,
    public activatedRoute: ActivatedRoute
  ) {}

  saveReferenceLocation(): void {
    MapComponent.map.on('geosearch/showlocation', (e: LeafletEvent | any) => {
      this.referenceLocation = e.location;
      this.showDistance = true;
    });
  }

  getEventsAll(): void {
    this.apiService.getEventsAll().subscribe((res: Events) => {
      this.events.push(res);
    });
  }

  ngOnInit(): void {
    this.getEventsAll();
  }
}
