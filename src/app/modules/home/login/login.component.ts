import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  returnUrl: string = '';

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //TODO: Fix the return URL when logged in
    this.route.queryParams
      .subscribe (params => this.returnUrl = params['return'] || '/company/PUTIDHERE');
  }

  login() {
    //do input checking here 
    if(this.username && this.password) {
      this.fb.login(this.username, this.password)
        .then((res) => {
          //success! navigate to the return url
          this.router.navigateByUrl(this.returnUrl);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
}
