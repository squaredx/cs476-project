import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string = '';

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //TODO: Fix the return URL when logged in
    this.route.queryParams
      .subscribe (params => this.returnUrl = params['return']);
  }

  onSubmit() {
    //do input checking here 
    if(this.username && this.password) {
      this.fb.login(this.username, this.password)
        .then((res) => {
          //success! navigate to the return url
          this.returnUrl = this.returnUrl ?? `/company/${res.user.uid}`;
          this.router.navigateByUrl(this.returnUrl);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  get username() {
    return this.loginForm.controls.email.value;
  }

  get password() {
    return this.loginForm.controls.password.value;
  }
}
