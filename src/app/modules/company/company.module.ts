import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { BillComponent } from './bill/bill.component';
import { InventoryComponent } from './inventory/inventory.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '../../shared/services/firestore.service';
import { DashboardService } from '../../shared/services/dashboard.service';

const routes: Routes = [
  {
    path: ':id',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':id/order',
    component: OrderComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':id/bill',
    component: BillComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':id/inventory',
    component: InventoryComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':id/product',
    component: ProductComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    BillComponent,
    InventoryComponent,
    OrderComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    FirestoreService,
    DashboardService,
  ]
})
export class CompanyModule { }
