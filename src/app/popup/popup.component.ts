import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() placeFi: String; 
  @Input() placeEn: String; 
  @Input() placeSv: String; 
  @Input() address: String;
  @Input() postalCode: String; 
  @Input() locality: String;
  @Input() ownPage: String;

  faLocationCrosshairs = faLocationCrosshairs;
   
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
  
  }
}
