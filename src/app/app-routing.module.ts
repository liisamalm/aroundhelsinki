import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'places', component: MainComponent },
  { path: 'events', component: MainComponent },
  { path: 'activities', component: MainComponent },
  { path: 'all', component: MainComponent},
  { path: 'main/detail/:id', component: PlaceDetailComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
