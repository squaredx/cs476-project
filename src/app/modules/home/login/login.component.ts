import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FireauthService } from 'src/app/shared/services/fireauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  returnUrl = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)] ]
  });

  constructor(
    private auth: FireauthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // TODO: Fix the return URL when logged in
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['return']);
  }

  onSubmit(): void {
    // reset error message
    this.errorMessage = '';

    // check email validation (angular and firebase provide email format checking)
    if (!this.email.value) {
      this.errorMessage = 'Please enter an email';
      return;
    }
    // check password validation
    if (!this.password.value || this.password.value.length < 6) {
      this.errorMessage = 'Please enter a valid password';
      return;
    }
    if (this.loginForm.valid) {
      this.auth.login(this.emailValue, this.passwordValue)
        .then((res) => {
          // success! navigate to the return url
          this.returnUrl = this.returnUrl ?? ``;
          this.router.navigateByUrl(this.returnUrl);
        })
        .catch((err) => {
          this.errorMessage = err.message;
          console.log(err.message);
        });
    }
  }

  get email(): AbstractControl {
    return this.loginForm.controls.email;
  }

  get password(): AbstractControl {
    return this.loginForm.controls.password;
  }


  get emailValue(): any {
    return this.loginForm.controls.email.value;
  }

  get passwordValue(): any {
    return this.loginForm.controls.password.value;
  }
}
