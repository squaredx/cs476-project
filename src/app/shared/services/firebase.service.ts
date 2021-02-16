import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth'

import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private auth: AngularFireAuth) {
    this.user = auth.authState;

    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      }
    )
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }), err => reject(err);
    });
  }

  logout() {
    this.auth.signOut()
      .catch(err => {
        console.log(err.message);
      });
  }

  signup(email: string, password: string) {
    return new Promise<any> ((resolve, reject) => {

    });
  }
  //TODO: Add firestore stuff here aswell
}
