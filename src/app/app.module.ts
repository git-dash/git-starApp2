import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { CheckInComponent } from './check-in/check-in.component';
import { environment } from '../environments/environment';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { SharedServicesModule } from './shared/shared-services/shared-services.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';

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
  {
    path: 'home',
    loadChildren: './offer/offer.module#OfferModule'
  },


];

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedMaterialModule,
    SharedServicesModule,
    NgQRCodeReaderModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
