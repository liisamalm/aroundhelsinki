import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @Input() nameFi: String;
  @Input() nameEn: String;
  @Input() nameSv: String;
  @Input() address: String;
  @Input() postalCode: String;
  @Input() locality: String;
  @Input() ownPage: String;
  @Input() type: String;

  faLocationCrosshairs = faLocationCrosshairs;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void { }
}
