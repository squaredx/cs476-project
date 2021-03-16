import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import firebase from 'firebase/app';

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
    private ds: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');

    this.data = this.ds.getDashboard(this.companyId);
  }
}
