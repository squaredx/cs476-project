import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, USE_EMULATOR} from '@angular/fire/functions';
import { environment } from '../environments/environment';

import {
  RiHome4Line,
  RiDashboard2Line,
  RiFileInfoLine,
  RiLoginBoxLine,
  RemixIconModule,
} from 'angular-remix-icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const icons = {
  RiHome4Line,
  RiDashboard2Line,
  RiFileInfoLine,
  RiLoginBoxLine
};


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    RemixIconModule.configure(icons),
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
