import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDashboard } from '../interfaces/dashboard';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private fns: AngularFireFunctions) { }

  getDashboard(id: string): Observable<IDashboard> {
    return this.fns.httpsCallable('updateDashboard')({companyId: id})
      .pipe(
        map( (value) => {
          let result = value as IDashboard;
          result.lastUpdated = new firebase.firestore.Timestamp(value.lastUpdated._seconds, value.lastUpdated._nanoseconds);
          return result;
        })
      );
  }
}
