import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../shared/shared-services/db-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navLinks: { label: string; path: string; index: number; }[];

  constructor(private dbService: DbFirebaseService, private router: Router) { }

  ngOnInit() {


    this.navLinks =
      [
        { label: 'Star Residentz! ', path: './outlet', index: 0 },
        // { label: 'Booking Details', path: './outlet', index: 1 },
        { label: 'Movie', path: './movies', index: 2 },
        { label: 'Food', path: './food', index: 3 },
        { label: 'Event', path: './event', index: 4 },
        // { label: 'Login', path: '', index: 5 },
      ];
  }

  logout() {
    this.dbService.resetStoreData(false);
    this.router.navigate(['']);
  }


}
