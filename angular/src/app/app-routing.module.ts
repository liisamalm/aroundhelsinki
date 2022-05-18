import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';

import { MainComponent } from './main/main.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'places', component: MainComponent },
  { path: 'events', component: MainComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'activities', component: MainComponent },
  { path: 'activity/:id', component: ActivityDetailComponent },
  { path: 'place/:id', component: PlaceDetailComponent },
  { path: 'places/place/:id', component: PlaceDetailComponent },
  { path: 'events/place/:id', component: PlaceDetailComponent },
  { path: 'activities/place/:id', component: PlaceDetailComponent },
  { path: 'home/place/:id', component: PlaceDetailComponent },
  { path: 'places/event/:id', component: EventDetailComponent },
  { path: 'events/event/:id', component: EventDetailComponent },
  { path: 'activities/event/:id', component: EventDetailComponent },
  { path: 'home/event/:id', component: EventDetailComponent },
  { path: 'places/activity/:id', component: ActivityDetailComponent },
  { path: 'events/activity/:id', component: ActivityDetailComponent },
  { path: 'activities/activity/:id', component: ActivityDetailComponent },
  { path: 'home/activity/:id', component: ActivityDetailComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
