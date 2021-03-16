import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../interfaces/user';

import { AngularFirestore } from '@angular/fire/firestore';
import { ICompany } from '../interfaces/company';
import { IComponent } from '../interfaces/component';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private angFirestore: AngularFirestore
  ) {}

  get(companyId: string, type: string, docId: string): Observable<IComponent> {
    return this.angFirestore.collection(`company/${companyId}/${type}`)
      .doc<IComponent>(docId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as IComponent;
            const payloadID = doc.payload.id;
            return { id: payloadID, ...data};
          }
        })
      );
  }
  // ---------------------------------

  list(companyId: string, type: string): Observable<IComponent[]> {
    return this.angFirestore.collection(`company/${companyId}/${type}`).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as IComponent;
          data.id = a.payload.doc.id;
          return data;
        })
      })
    );
  }

  // ---------------------------------

  getCompanyDetails(companyId: string): Observable<ICompany> {
    return this.angFirestore.collection('company')
      .doc<ICompany>(companyId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as ICompany;
            const payloadID = doc.payload.id;
            return { id: payloadID, ...data};
          }
        })
      );
  }

  getUserDetails(userId: string): Observable<IUser> {
    return this.angFirestore.collection('users')
      .doc<IUser>(userId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            const data = doc.payload.data() as IUser;
            return data;
          }
        })
      );
  }

  // Setters
  add(companyId: string, type: string, entry: IComponent): Promise<IComponent> {
    return new Promise<IComponent> ((resolve, reject) => {
      this.angFirestore.collection(`company/${companyId}/${type}`)
        .add(entry)
        .then((ref) => {
          const newEntry = { // TODO: see if this actually updates ID
            id: ref.id,
            ...entry,
          };
          resolve(newEntry);
        })
    });
  }

  update(companyId: string, type: string, entry: IComponent): Promise<IComponent> {
    return new Promise<IComponent>((resolve, reject) => {
      this.angFirestore.collection(`company/${companyId}/${type}`)
        .doc<IComponent>(entry.id)
        .set(entry)
        .then(() => {
          resolve({
            ...entry
          });
        });
    });
  }

  // delete entry
  delete(companyId: string, type: string, docId: string): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      this.angFirestore.collection(`company/${companyId}/${type}`)
        .doc<IComponent>(docId)
        .delete()
        .then(() => {
          resolve();
        });
    });
  }
}
