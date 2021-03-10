import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import {
  RiHome4Line,
  RiDashboard2Line,
  RiFileInfoLine,
  RiLoginBoxLine,
  RemixIconModule,
} from 'angular-remix-icon';
import { CompanyinventoryComponent } from './modules/companyinventory/companyinventory.component';

const icons = {
  RiHome4Line,
  RiDashboard2Line,
  RiFileInfoLine,
  RiLoginBoxLine
};


@NgModule({
  declarations: [
    AppComponent,
    CompanyinventoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RemixIconModule.configure(icons),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
