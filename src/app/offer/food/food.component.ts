import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { ConfirmModalComponent } from '../../shared/shared-material/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  food: {
    'north': { 'id': number; 'name': string; 'image': string; 'cost': number; 'type': string; 'description': string; }[],
    'west': { 'id': number; 'name': string; 'image': string; 'cost': number; 'type': string; 'description': string; }[],
    'south': { 'id': number; 'name': string; 'image': string; 'cost': number; 'type': string; 'description': string; }[],
    'east': { 'id': number; 'name': string; 'image': string; 'cost': number; 'type': string; 'description': string; }[];
  };

  purchasedEvents: number[] = this.dbService.getStoreData('purchasedEvents') || [];
  eventList: { 'id': number, 'imageURL': string; 'desc': string; 'cost': number }[];
  selectRegion = [];
  constructor(private dbService: DbFirebaseService, private dialog: MatDialog) { }

  foodOptions = [
    { 'select': 'north', color: 'default', title: 'North' },
    { 'select': 'south', color: 'warn', title: 'South' },
    { 'select': 'west', color: 'primary', title: 'West' },
    { 'select': 'east', color: 'accent', title: 'East' },
  ];
  ngOnInit() {

    this.eventList = environment.eventList.map(x => {
      return {
        id: x.id,
        imageURL: x.imageURL,
        desc: x.desc,
        cost: Math.floor(Math.random() * 500),

      };
    });

    this.food = environment.foodList;



    this.changeRegion('north');
  }

  changeRegion(region: any) {
    this.selectRegion = this.food[region];
    this.selectRegion.sort((first: any, second: any) => first.description.length - second.description.length);
  }

  confirmViewOption(id, name, type, cost) {

    const dialogRef = this.dialog.open(
      ConfirmModalComponent,
      {
        height: '250px',
        data: {
          title: `Food :  ${name}`, confirmMessage: `Would  you like to have : ${name}`, from: 'FoodComponent'
          , cost: cost
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        // this.openVideoModal()
        console.log('The dialog was closed' + result);
        this.dbService.addServiceIntoBillingModal(id, `'event'`, name, cost)
          .then(response => {
            console.log(response);

            // this.openVideoModal(id, title, releaseDate, videoList);
          });
      } else {
        console.log('The dialog was closed');

      }
    });
  }

}
