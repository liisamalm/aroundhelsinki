import { Component, Input, OnInit } from '@angular/core';
import { MarkerService } from '../main/marker.service';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../main/places';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { WeekDay } from '@angular/common';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

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


  constructor(private markerService: MarkerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOnePlace();

  }

  getOnePlace(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.placeid = params.get('id');
      console.log(this.placeid); //get id
      return this.markerService.getOnePlace(this.placeid)
    })
    ).subscribe(data => {
      const reqObj = data.data.find((item: { id: any; }) => item.id == this.placeid)
      this.places = reqObj;
      console.log(this.places); // get selected data
    })
  }


}
