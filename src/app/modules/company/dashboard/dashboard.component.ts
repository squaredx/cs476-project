import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import firebase from 'firebase/app';

import { IEntry } from '../../../shared/interfaces/entry';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private fb: FirebaseService,
    private ds: DashboardService,
  ) { }

  ngOnInit(): void {
    // this.fb.list('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills').subscribe((value) => {
    //   console.log(value);
    // });
    const test: IEntry = {
      //id: 'CEkDaqYXkHMVnzi55JeD',
      type: 'bill',
      name: 'NExt one!',
      description: 'NO WAY!',
      date: firebase.firestore.Timestamp.now().toMillis()
    }

    //Create new entry
    // this.fb.add('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills', test).then((res) => {
    //   console.log(res);
    // });

    //Update entry
    // this.fb.update('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills', test).then((res) => {
    //   console.log(res);
    // })

    // let listent: IEntry[];
    // this.fb.list('OzwAna5B18WreDH3XsFV', 'bills').subscribe((val) => {
    //   listent = val;
    //   console.log(listent);
    // })

    //Delete entry
    // this.fb.delete('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills', 'CEkDaqYXkHMVnzi55JeD');

    this.ds.getDashboard('8tm64ej1O7e2Yc16zt2nddgNqzr2').subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('done');
      }
    });
  }

}
