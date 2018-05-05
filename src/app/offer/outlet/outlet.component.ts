import { Component, OnInit, OnDestroy } from '@angular/core';

import { CheckInService } from '../../shared/shared-services/check-in.service';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../shared/shared-material/confirm-modal/confirm-modal.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit, OnDestroy {
  sample$: Subscription;
  data: any;


  constructor(private dbService: DbFirebaseService, private checkInService: CheckInService
    , private dialog: MatDialog, private router: Router) { }

  ngOnInit() {

    const roomKey = this.dbService.getStoreData('roomKey') || null;
    this.sample$ =
      this.checkInService
        .checkRoomKey(roomKey)
        .subscribe((data: any) => {
          console.log(data);

          if (data.length !== 0) {


            const el = data[0];
            if (el.checkingDetails.isCheckOut) {
              el['status'] = 'User is Requested for Checkout and is under process for approval';
            } else if (!el.checkingDetails.isCheckIn) {
              el['status'] = 'User is yet to Check-In';
            } else if (el.checkingDetails.isCheckIn) {
              el['status'] = 'User is  Checked-In and staying in hotel';
            }
            let total = 0;

            el.usedServices = Object.values(el.usedServices);
            el.usedServices.forEach((serv: any, index) => {
              total += serv.cost;
              serv['id'] = index + 1;
            });
            el['total'] = total;

            this.data = el;
          }
        });
  }


  successfulCheckout(roomKey) {

    const roomAvail = this.data.checkingDetails.checkIn + '-'
      + this.data.checkingDetails.checkOut;
    const total = this.data.total;

    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '350px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);

      if (result !== undefined) {

        this.checkInService.successfulCheckout(
          this.data.roomKey // room id
          , this.data.roomDetails.id // room id
          , roomAvail,
          total,
          result.message, result.rating
        );

        this.dbService.resetStoreData(false);

      }
    });
  }

  checkingStatus(successfulCheckout) {

    const bookingId = this.data.roomKey;
    const cost = this.data.total;
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: 'fit-content',
      data: {
        title: 'Checkout Request ',
        confirmMessage: successfulCheckout ? `Are you sure you want to Checkout?` : `Do you want to Send Checkout Request:`
        , from: 'OutletComponent'
        , cost: cost
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log(result);


      if (successfulCheckout) {
        if (result !== undefined) {
          this.successfulCheckout(bookingId);
        }
      } else {
        if (result === true) {
          this.checkInService.checkInRequest(bookingId, 1);
        }
      }
    });



  }

  ngOnDestroy(): void {
    this.sample$.unsubscribe();
  }

  logout(): void {
    this.dbService.resetStoreData(false);
    this.router.navigate(['']);
  }
}
