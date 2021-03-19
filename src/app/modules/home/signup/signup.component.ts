import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { FireauthService } from 'src/app/shared/services/fireauth.service';
import { ConfirmedValidator } from '../../../shared/validators/confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage = '';

  signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    phoneNumber: [''],
    companyName: ['', Validators.required],
    companyDesc: ['']
  }, {
    validators: ConfirmedValidator('password', 'confirmPassword')
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: FireauthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.errorMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    // check first name validation
    if (!this.firstName.value) {
      this.errorMessage = 'Please enter a first name';
      return;
    }
    // check last name validation
    if (!this.lastName.value) {
      this.errorMessage = 'Please enter a last name';
      return;
    }
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
    // check if confirm password is correct
    if (this.password.value !== this.confirmPassword.value) {
      this.errorMessage = 'Confirm password does not equal original password';
      return;
    }
    // check first name validation
    if (!this.companyName.value) {
      this.errorMessage = 'Please enter a company name';
      return;
    }

    // create signup object
    const data: IUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value,
      companyName: this.companyName.value,
      companyDesc: this.companyDesc.value,
    }

    if (this.signupForm.valid) {
      this.auth.signup(data).then( (result) => {
        this.router.navigateByUrl(``);
      }).catch( (err) => {
        this.errorMessage = err.message;
        console.log(err.message);
      });
    }
  }

  get firstName(): AbstractControl {
    return this.signupForm.controls.firstName;
  }

  get lastName(): AbstractControl {
    return this.signupForm.controls.lastName;
  }

  get email(): AbstractControl {
    return this.signupForm.controls.email;
  }

  get password(): AbstractControl {
    return this.signupForm.controls.password;
  }

  get confirmPassword(): AbstractControl {
    return this.signupForm.controls.confirmPassword;
  }

  get phoneNumber(): AbstractControl {
    return this.signupForm.controls.phoneNumber;
  }

  get companyName(): AbstractControl {
    return this.signupForm.controls.companyName;
  }

  get companyDesc(): AbstractControl {
    return this.signupForm.controls.companyDesc;
  }
}
