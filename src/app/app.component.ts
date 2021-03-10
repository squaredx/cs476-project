import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './shared/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WorkMVRK';

  constructor (
    public firebase: FirebaseService
  ) {}

  signOut(): void {
    this.firebase.logout();
  }
}
