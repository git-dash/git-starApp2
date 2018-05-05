
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ConfirmModalComponent } from '../../shared/shared-material/confirm-modal/confirm-modal.component';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class OutletComponent implements OnInit {
  userEmail: string;

  navLinks: { label: string; path: string; index: number; }[];

  constructor(private dbService: DbFirebaseService, private router: Router) { }

  ngOnInit() {


    this.userEmail = this.dbService.getStoreData('userId');
    this.navLinks =
      [
        { label: 'Star Residentz! ', path: './home', index: 0 },
        { label: 'Movie', path: './movies', index: 2 },
        { label: 'Food', path: './food', index: 3 },
        { label: 'Event', path: './event', index: 4 },
      ];
  }

  logout() {
    this.dbService.resetStoreData(false);
    this.router.navigate(['']);
  }


}
