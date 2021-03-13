import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import firebase from 'firebase/app';

import { IEntry } from '../../../shared/interfaces/entry';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { IDashboard } from 'src/app/shared/interfaces/dashboard';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companyId: string;
  data: Observable<IDashboard>;

  constructor(
    private fb: FirebaseService,
    private ds: DashboardService,
    private route: ActivatedRoute,
  ) { }

  // Here is what we need to do to get information from the dashboard!
  // <div>
  //   income: {{(data | async)?.projectedIncome}}
  // </div>  

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id')
    console.log(this.companyId);


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
    // this.fb.add(this.companyId, 'bills', test).then((res) => {
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

  
    // this.data = this.ds.getDashboard(this.companyId);

    // this.ds.getDashboard(this.companyId).subscribe((val) => {
    //   console.log(val);
    // });
  }

}
