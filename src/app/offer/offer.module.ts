import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { OutletComponent } from './outlet/outlet.component';
import { MovieComponent } from './movie/movie.component';
import { EventComponent } from './event/event.component';
import { FoodComponent } from './food/food.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared/shared-material/shared-material.module';
import { PlayVideoComponent } from './movie/play-video/play-video.component';
import { BasicInfoComponent } from './movie/basic-info/basic-info.component';
import { SafeVideoPipe } from '../shared/filters/safe-video.pipe';



export const routes: Route[] = [
  // {
  //   pathMatch: 'full', path: '',
  //   redirectTo: 'home'
  // },

  {
    path: '', component: HomeComponent, canActivate: []
    , children: [
      {
        path: '', redirectTo: 'outlet'
      },
      {
        path: 'outlet', component: OutletComponent
      },
      {
        path: 'movies', component: MovieComponent
      },
      {
        path: 'event', component: EventComponent
      },
      {
        path: 'food', component: FoodComponent
      },

    ]
  },
];
@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent, OutletComponent, MovieComponent, EventComponent, FoodComponent
    , BasicInfoComponent, PlayVideoComponent, SafeVideoPipe
  ]
})
export class OfferModule { }
