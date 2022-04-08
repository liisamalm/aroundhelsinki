import { Component, OnInit } from '@angular/core';
import { MarkerService } from '../main/marker.service';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../main/places';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  places: Places[] = [];
 
  constructor(private markerService: MarkerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
}
