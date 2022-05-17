import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  back$ = new BehaviorSubject<any>(null);

  constructor() { }
}
