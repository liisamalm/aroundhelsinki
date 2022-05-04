import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';

import { MainComponent } from './main/main.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'places', component: MainComponent },
  { path: 'events', component: MainComponent },
  { path: 'activities', component: MainComponent },
  { path: 'main/place/:id', component: PlaceDetailComponent },
  { path: 'main/event/:id', component: EventDetailComponent },
  { path: 'aboutus', component: AboutusComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
