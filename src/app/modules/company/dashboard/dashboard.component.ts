import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import firebase from 'firebase/app';
import * as moment from 'moment';

import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { IDashboard } from 'src/app/shared/interfaces/dashboard';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICompany } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companyId: string;
  companyDetails: Observable<ICompany>;
  data: Observable<IDashboard>;

  constructor(
    private ds: DashboardService,
    private route: ActivatedRoute,
    private fs: FirestoreService,
  ) { }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');

    this.data = this.ds.getDashboard(this.companyId);
    this.companyDetails = this.fs.getCompanyDetails(this.companyId);
  }
}
