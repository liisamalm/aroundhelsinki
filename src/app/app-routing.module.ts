import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { EventsComponent } from './events/events.component';
import { MainComponent } from './main/main.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'main/detail/:id', component: PlaceDetailComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'events/detail/:id', component: EventsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'activities/detail/:id', component: ActivitiesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
