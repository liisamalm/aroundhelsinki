import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'all', component: MainComponent },
  { path: 'places', component: MainComponent },
  { path: 'events', component: MainComponent },
  { path: 'activities', component: MainComponent },
  { path: 'main/activity/:id', component: ActivityDetailComponent },
  { path: 'main/place/:id', component: PlaceDetailComponent },
  { path: 'main/event/:id', component: EventDetailComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
