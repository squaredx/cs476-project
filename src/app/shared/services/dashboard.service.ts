import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDashboard } from '../interfaces/dashboard';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private fns: AngularFireFunctions) { }

  getDashboard(id: string): Observable<IDashboard> {
    return this.fns.httpsCallable('updateDashboard')({companyId: id})
      .pipe(
        map( (value) => {
          const result = value as IDashboard;
          return result;
        })
      );
  }
}
