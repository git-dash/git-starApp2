import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { MatDialog } from '@angular/material';
import { ConfirmModalComponent } from '../../shared/shared-material/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  purchasedEvents: number[] = this.dbService.getStoreData('purchasedEvents') || [];
  eventList: { 'id': number, 'imageURL': string; 'desc': string; 'cost': number }[];

  constructor(private dbService: DbFirebaseService, private dialog: MatDialog) { }

  ngOnInit() {

    this.eventList = environment.eventList.map(x => {
      return {
        id: x.id,
        imageURL: x.imageURL,
        desc: x.desc,
        cost: Math.floor(Math.random() * 500),

      };
    });
  }


  confirmViewOption(id, title, cost) {

    const dialogRef = this.dialog.open(
      ConfirmModalComponent,
      {
        height: '250px',
        data: {
          title: `Event :  ${title}`, confirmMessage: `Do you want to Participate in Event:`, from: 'EventComponent'
          , cost: cost
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        // this.openVideoModal()
        console.log('The dialog was closed' + result);
        this.dbService.addServiceIntoBillingModal(id, 'event', title, cost)
          .then(response => {
            console.log(response);

            this.purchasedEvents.push(id);
            this.dbService.setStoreData('purchasedEvents', this.purchasedEvents);
            // this.openVideoModal(id, title, releaseDate, videoList);
          });
      } else {
        console.log('The dialog was closed');

      }
    });
  }

  isEventWatched(eventId) {
    return this.purchasedEvents.findIndex(event => event === eventId) > -1
      ? true : false;
  }


}
