import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { ISignupData } from '../interfaces/user-signup';

import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICompanyDetails } from '../interfaces/company-details';
import { IEntry } from '../interfaces/entry';
import { IDashboard } from '../interfaces/dashboard';


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

  logout(): void {
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

  get(companyId: string, type: string, docId: string): Observable<IEntry> {
    return this.fs.collection(`company/${companyId}/${type}`)
      .doc<IEntry>(docId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as IEntry;
            const payloadID = doc.payload.id;
            return { id: payloadID, ...data};
          }
        })
      );
  }
  //---------------------------------

  list(companyId: string, type: string): Observable<IEntry[]> {
    return this.fs.collection(`company/${companyId}/${type}`).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IEntry;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }

  //---------------------------------

  getCompanyDetails(id: string): Observable<ICompanyDetails> {
    return this.fs.collection('company')
      .doc<ICompanyDetails>(id)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as ICompanyDetails;
            const payloadID = doc.payload.id;
            return { id: payloadID, ...data};
          }
        })
      );
  }

  //Setters
  
  add(companyId: string, type: string, entry: IEntry): Promise<IEntry> {
    return new Promise<IEntry> ((resolve, reject) => {
      this.fs.collection(`company/${companyId}/${type}`)
        .add(this._firebaseSerialize(entry))
        .then((ref) => {
          const newEntry = { //TODO: see if this actually updates ID
            id: ref.id,
            ...entry,
          };
          resolve(newEntry);
        })
    });
  }

  update(companyId: string, type: string, entry: IEntry): Promise<IEntry> {
    return new Promise<IEntry>((resolve, reject) => {
      this.fs.collection(`company/${companyId}/${type}`)
        .doc<IEntry>(entry.id)
        .set(this._firebaseSerialize(entry))
        .then(() => {
          resolve({
            ...entry
          });
        });
    });
  }

  //delete entry
  delete(companyId: string, type: string, docId: string): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      this.fs.collection(`company/${companyId}/${type}`)
        .doc<IEntry>(docId)
        .delete()
        .then(() => {
          resolve();
        });
    });
  }

  //convert the javascript object into an object for firebase
  private _firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
  }
}
