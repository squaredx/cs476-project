import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { first, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import firebase from 'firebase/app';
import { IUser } from '../interfaces/user';
import { FirestoreService } from './firestore.service';
import { ICompany } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  private userDetails: firebase.User = null;
  private companyId: string = null;
  private companyDetails: ICompany = null;
  private uData: IUser = null;

  constructor(
    private angAuth: AngularFireAuth,
    private fs: FirestoreService,
    private angFirestore: AngularFirestore,
  ) {
    this.angAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userDetails = user;
          localStorage.setItem('user', JSON.stringify(this.userDetails));
          return this.fs.getUserDetails(user.uid);
        }
        else {
          this.userDetails = null;
          localStorage.setItem('user', null);
        }
      }),
    ).subscribe(uData => {
      this.uData = uData;
      this.companyId = uData.companyLink.id;
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  public get user(): firebase.User {
    return this.userDetails;
  }

  public get userInformation(): IUser {
    return this.uData;
  }

  public get userCompanyId(): string {
    return this.companyId;
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.angAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  logout(): void {
    this.angAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  signup(data: IUser): Promise<firebase.auth.UserCredential>{
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.angAuth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          const fsData = data;
          delete fsData.password; // remove password from data
          Object.assign(fsData, {creationDate: firebase.firestore.FieldValue.serverTimestamp()});
          this.angFirestore.collection('users').doc(res.user.uid).set(fsData); // maybe use then/catch??
          resolve(res);
        }).catch(err => reject(err));
    });
  }
}
