import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

const routes: Routes = [
  {
    path: ':id',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    FirebaseService,
  ]
})
export class CompanyModule { }
