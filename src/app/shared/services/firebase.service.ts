import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ISignupData } from '../interfaces/user-signup';

import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { CompanyDetailsAdapter } from '../adapters/company-details.adapter';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userDetails: firebase.User = null;

  constructor(
    private auth: AngularFireAuth,
    private fs: AngularFirestore
  ) {
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

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
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

  signup(data: ISignupData): Promise<firebase.auth.UserCredential>{
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(res => {
          const fsData = data;
          delete fsData.password; //remove password from data
          Object.assign(fsData, {creationDate: firebase.firestore.FieldValue.serverTimestamp()})
          this.fs.collection('users').doc(res.user.uid).set(fsData); //maybe use then/catch??
          resolve(res);
        }).catch(err => reject(err));
    });
  }
  //TODO: Add firestore stuff here aswell

  //Maybe use composition??
  //getProduct()
  //getInventory()
  //getBill
  //getOrder()

  //getItem(type: Type, id: string)
  //  --switch type
  //    -type.get(id) <-use composition
  //      return the data from the above operation

  //---------------------------------

  //getManyProduct()
  //getManyInventory()
  //getManyBill
  //getManyOrder()

  //getManyItems(type: Type)
  //same idea as above
  //  --switch type
  //    -type.get(id) <-use composition
  //      return the data from the above operation

  //---------------------------------

  //getDashboard()
  getDashboard(id: string) {
    //return new Promise<firebase.firestore.DocumentSnapshot>();
  }

  //getCompanyDetails()

  getCompanyDetails(id: string){
    //this.fs.firestore.collection('company').doc(id).withConverter();
  }
}
