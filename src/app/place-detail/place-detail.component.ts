import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  link: string = '';
  newImageString: string = '';

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              ) {
                this.link = 'https://tprimages.blob.core.windows.net/public/';
               }

  ngOnInit(): void {
    this.getOnePlace();
  }

  getOnePlace(): void {
    this.route.paramMap.pipe(switchMap(params => {
      this.placeid = params.get('id');

      return this.apiService.getOnePlace(this.placeid)
    })
    ).subscribe(data => {
      if (data.id == this.placeid) {

        this.places = data;
      }
    })
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
