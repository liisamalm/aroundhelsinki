import { Component, Input, OnInit } from '@angular/core';
import { MarkerService } from '../main/marker.service';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../main/places';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { WeekDay } from '@angular/common';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  placeid:any;
  places: any;
  date: Date = new Date();
  faCheck = faCheck;
  faTimes = faTimes;
  link: string = '';
  newImageString: string = '';
  place: any;

  constructor(private markerService: MarkerService,
              private route: ActivatedRoute,
              ) {
                this.link = 'https://tprimages.blob.core.windows.net/public/';
               }

  ngOnInit(): void {
    this.getOnePlace();
  }

  getPlaceId(): void {
    this.route.paramMap.pipe(switchMap(params => {
        this.placeid = params.get('id');
        return this.placeid;
    }));
  }

  getOnePlace(){
    this.markerService.getOnePlace(this.getPlaceId).subscribe(res => {
      this.place = res;
    }, err => console.log(err));
  }

  getImageUrl(id: number,media_id: string){
    var imglink = `${this.link}${id}/${media_id}.jpg`;
    return imglink;
  }

  changeImg(event: any){
    this.newImageString = event.target.getAttribute('src');
    document.getElementById('view-img')?.setAttribute('src', this.newImageString);
  }
}
