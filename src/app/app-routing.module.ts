import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemixIconModule } from "angular-remix-icon";

import { RiHome3Line } from "angular-remix-icon";

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) 
  },
  {
    path: 'company',
    loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
