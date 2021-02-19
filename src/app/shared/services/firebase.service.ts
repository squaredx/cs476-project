import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ISignupData } from '../interfaces/user-signup';

import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userDetails: firebase.User = null;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
        if (user) {
          this.userDetails = user;
          localStorage.setItem('user', JSON.stringify(this.userDetails));
        }
        else {
          this.userDetails = null;
          localStorage.setItem('user', null);
        }
      }
    )
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  public get user(): firebase.User {
    return this.userDetails;
  }

  login(email: string, password: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }), err => reject(err);
    });
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  signup(data: ISignupData) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          resolve(res);
        }), err => reject(err);
    });
  }
  //TODO: Add firestore stuff here aswell
}
