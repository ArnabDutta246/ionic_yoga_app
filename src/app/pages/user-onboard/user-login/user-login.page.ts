import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorMessage } from 'src/app/form-validators/validator-messages';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  //variables
  roomLoginForm: FormGroup;
  isSubmit: boolean = false;
  validation_messages = ValidatorMessage;
  togglePassField: boolean = false;

  //constructor
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.roomLoginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ]),
      ],
    });
  }

  // oninit
  ngOnInit() {}

  // get reactive form error
  get f() {
    return this.roomLoginForm.controls;
  }

  // submit
  submit() {
    console.log(this.roomLoginForm.value);
  }

  goToSignUp() {
    this.router.navigate(['/user-register']);
  }
}
