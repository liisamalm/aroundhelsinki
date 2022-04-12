import { Component, OnInit, Input, Output } from '@angular/core';
import { Places } from '../main/places';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() paikka: Places
  

  constructor() { }

  ngOnInit(): void {
  }

}
