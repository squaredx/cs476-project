import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignupData } from 'src/app/shared/interfaces/user-signup';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.minLength(8)],
    phoneNumber: [''],
    companyName: ['', Validators.required],
    companyDesc: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.signupForm);
    const data: ISignupData = {
      firstName: this.signupForm.controls.firstName.value,
      lastName: this.signupForm.controls.lastName.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
      phoneNumber: this.signupForm.controls.phoneNumber.value,
      companyName: this.signupForm.controls.companyName.value,
      companyDesc: this.signupForm.controls.companyDesc.value,
    }

    this.firebase.signup(data).then( (result) => {
      this.router.navigateByUrl(`/company/${result.user.uid}`)
    }).catch( (err) => {
      console.log(err.message);
    })
  }
}
