import { Component, OnInit } from '@angular/core';
import { FireauthService } from './shared/services/fireauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WorkMVRK';

  constructor(
    public auth: FireauthService
  ) {}

  signOut(): void {
    this.auth.logout();
  }
}
