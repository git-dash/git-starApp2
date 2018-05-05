import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CheckInComponent } from './check-in/check-in.component';
import { environment } from '../environments/environment';


const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'check-in'
  },
  {
    path: 'check-in',
    component: CheckInComponent
    // loadChildren: './pre-stay/pre-stay.module#PreStayModule'
  },
  // {
  //   path: 'admin',
  //   loadChildren: './admin/admin.module#AdminModule'
  // },


];

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
