import { Component, OnInit } from '@angular/core';
import { IEntry } from 'src/app/shared/interfaces/entry';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import firebase from 'firebase/app';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private fb: FirebaseService) { }

  ngOnInit(): void {
    // this.fb.list('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills').subscribe((value) => {
    //   console.log(value);
    // });
    const test: IEntry = {
      id: 'CEkDaqYXkHMVnzi55JeD',
      type: 'bill',
      name: 'This is a bill',
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

    //Delete entry
    // this.fb.delete('8tm64ej1O7e2Yc16zt2nddgNqzr2', 'bills', 'CEkDaqYXkHMVnzi55JeD');

    this.fb.getDashboard('fWEiwYS25pqEXjrmcA6l').subscribe((val) => {
      console.log(val);
    });
  }

}
