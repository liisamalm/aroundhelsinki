import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from './modal';
import {TranslateService} from '@ngx-translate/core';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;

  closeResult: string = '';
  modalInfo : any;
  modal: Modal[];

  constructor(private markerService: MarkerService, private modalService: NgbModal) { }
  

  private initMap(): void {
    this.map = L.map('map', {
      center: [60.16952, 24.93545 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makePlaceMarkers(this.map);
  }

  // ngOnInit(){
  //   this.modal = this.modalInfo;
  //   this.placeModal(this.modal);
  // }

  // placeModal(data: any){
  //   this.markerService.makeMapPopup(data).subscribe((res: any) => {
  //     this.modalInfo = res;
  //     console.log(res);
  //   })

  // }

  
}

/*RUUAN JÄLKEEN
- yksittäiset sanat ei kovakoodattuna moduulissa
- viikonpäivät aukioloaikoihin ja päivät näkymään erikseen


*/