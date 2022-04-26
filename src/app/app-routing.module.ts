import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { EventsComponent } from './events/events.component';
import { ActivitiesComponent } from './activities/activities.component';

const routes: Routes = [
  { path: 'places', component: PlacesComponent },
  { path: 'places/detail/:id', component: PlaceDetailComponent },
  { path: '', redirectTo: '/places', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'activities', component: ActivitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
