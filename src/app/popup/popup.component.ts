import { Component, OnInit, Input, Output } from '@angular/core';
import { Places } from '../main/places';
import { MarkerService } from '../main/marker.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  places: Places[] = [];
 /* @Input() places: Places[] = []; */
    @Input() place: String 
    @Input() address: String;

  
  

  constructor(private markerService: MarkerService,
              public translate: TranslateService) { }

  ngOnInit(): void {
   
  }
}
