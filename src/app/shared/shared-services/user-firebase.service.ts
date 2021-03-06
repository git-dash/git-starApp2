import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// import {AngularFire  } from 'angularfire2';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { DbFirebaseService } from './db-firebase.service';
@Injectable()
export class UserFirebaseService {

  constructor(private _dbService: AngularFireDatabase, private _fireAuth:
    AngularFireAuth, private _sessionUser: DbFirebaseService) {

  }

  getUserList() {
    return this._dbService.list('users').valueChanges();
  }


  register(post): Promise<any> {
    // register into firebase

    return this._fireAuth.auth.createUserWithEmailAndPassword(post.email, post.password).then(response => {
      //  console.log(response);

      this._fireAuth.auth.currentUser.updateProfile(
        {
          displayName: post.fullName,
          // phoneNumber: post.mobile,
          photoURL: ''
        }
      ).then(resp => {
        //  console.log(resp);
      }, error => {
        //  console.log(error);
      });
      const pushId = this._dbService.createPushId();
      this._dbService.database.ref('users').child(pushId).set
        ({
          // 'email': post.email,
          'displayName': post.fullName,
          'phoneNumber': post.mobile,
          // 'password': post.password,
          'gender': post.gender,
          'dob': post.dob,
          'pushId': pushId,
          'userUid': response.uid
        });
    }
      , error => {
        //  console.log(error);

      });

  }


  getCurrentUser() {

    return this._fireAuth.authState;
  }


  login(provider, post) {
    if (provider === 1) {

      return this._fireAuth.auth.signInWithEmailAndPassword(post.username, post.password);

    } else {
      return this._fireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }
  logout() {

    sessionStorage.clear();
    this._fireAuth.auth.signOut();
  }


  getUserProfile(userId: any) {
    return this._sessionUser.getDbData('users', 'userUid', userId);
  }

  updateUserProfile(newProfile: any, pushId: string) {

    const path = `users/${pushId}`;

    this._dbService.database.ref(path)
      .update({
        'phoneNumber': newProfile.phoneNumber,
        'foodPreference': newProfile.foodPreference,
        'roomPreference': newProfile.roomPreference,
        'servicePreference': newProfile.servicePreference,
        'gender': newProfile.gender,
        'paymentMode': newProfile.paymentMode,
        'photoURL': newProfile.photoURL,

      })
      .then(response => {
        alert('Profile Updated Successfully');
      })
      .catch(error => {
        //  console.log();
      });

  }
}
