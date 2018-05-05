import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DbFirebaseService } from '../shared-services/db-firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _dbService: DbFirebaseService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roomKey = this._dbService.getStoreData('roomKey') || null;
    // JSON.parse(sessionStorage.getItem('currentUser'));
    if (roomKey) {
      //  && JSON.parse(currentUser).type === 'admin') {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url


    this._router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;


  }
}


