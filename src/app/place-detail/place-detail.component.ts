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
  link: string = 'https://tprimages.blob.core.windows.net/public';
  newImageString: string = '';

  constructor(private markerService: MarkerService,
              public route: ActivatedRoute,
              ) {

               }

  ngOnInit(): void {
    this.getOnePlace();
  }

  getOnePlace(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.placeid = params.get('id');

      return this.markerService.getOnePlace(this.placeid)
    })
    ).subscribe(data => {
      if (data.id == this.placeid) {

        this.places = data;
        console.log(this.places);
      }

      // const reqObj = data.get((item: { id: any; }) => item.id == this.placeid)
      // this.places = reqObj;
    })
  }

  getImageUrl(id: any,media_id: any){
    const imglink: string = `${this.link}/${id}/${media_id}.jpg`;

    // const imglink: any = this.link + "/" + id + "/" + media_id + ".jpg";
    // console.log(imglink);
    // console.log(id);
    // console.log(media_id);
    return imglink;
  }

  changeImg(event: any){
    this.newImageString = event.target.getAttribute('src');
    document.getElementById('view-img')?.setAttribute('src', this.newImageString);
  }
}
