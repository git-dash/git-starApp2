import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


import { Subscription } from 'rxjs/Subscription';
import { CheckInService } from '../shared/shared-services/check-in.service';
import { DbFirebaseService } from '../shared/shared-services/db-firebase.service';

@Component({
  // selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit, OnDestroy {
  sample$: Subscription;


  inputMode = 'textMode';

  dataurl = null;
  elementType = 'url';
  scanKey: string = null;
  key: string = null;
  data: any = {
  };
  isKeyValid: boolean = null;
  constructor(private checkInService: CheckInService, private router: Router, private dbService: DbFirebaseService) { }


  ngOnInit() {
    // this.data.roomKey
    this.key =
      // '-LACLIdDspNmBgQMRMXH';
      '-LBGPhXEymPPJC8bQdhr';
  }

  render(e) {
    this.scanKey = e.result;
    console.log(e.result);

  }



  onChange(event) {
    this.elementType = 'dataurl';
    const files = event.srcElement.files;
    console.log(files);
    const fi = new FileReader();

    fi.onload =
      (e) => {
        this.dataurl = fi.result;
      };


    if (files.length !== 0) {
      // reset key
      this.scanKey = null;
      fi.readAsDataURL(files[0]);
    }
  }



  checkRoomKey() {
    // reset validation step
    this.isKeyValid = false;

    const roomKey = this.inputMode === 'textMode' ? this.key : this.scanKey;

    this.sample$ =
      this.checkInService
        .checkRoomKey(roomKey)
        .subscribe(response => {
          console.log(response);

          if (response.length !== 0) {
            this.isKeyValid = true;

            // save key data into session
            // getting movie list
            this.dbService.setStoreData('roomKey', roomKey);
            const checkInData: any = response[0];

            const movieList = Object.values(checkInData['usedServices'])
              .filter(x => x.type === 'movie')
              .map(x => x.id);



            const eventList = Object.values(checkInData['usedServices'])
              .filter(x => x.type === 'event')
              .map(x => x.id);
            this.dbService.setStoreData('purchasedMovies', movieList);


            // this.dbService.setStoreData('purchasedEvents', eventList);

            // a= Object.values(resp[0].usedServices)

            // this.purchasedMovies = this.dbService.getStoreData('purchasedMovies');

            this.checkInService.checkInRequest(checkInData.roomKey, 0);
            this.router.navigate(['/home']);
          } else {
            window.alert('Invalid Key or QR Code');
          }
        });
  }


  ngOnDestroy(): void {
    this.sample$.unsubscribe();
  }
}
