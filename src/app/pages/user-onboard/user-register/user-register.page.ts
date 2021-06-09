import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorMessage } from 'src/app/form-validators/validator-messages';
import {
  calculateErrors,
  ConfirmedValidator,
} from 'src/app/form-validators/validators';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  //variables
  roomRegisterForm: FormGroup;
  isSubmit: boolean = false;
  validation_messages = ValidatorMessage;
  togglePassword: boolean = false;
  togglePasswordTwo: boolean = false;

  //constructor
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private common: CommonComponentService
  ) {
    let email_pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let pass_patter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
    let phone_patter = /^[0-9]+$/;

    this.roomRegisterForm = this.formBuilder.group(
      {
        name: [
          '',
          Validators.compose([Validators.required, Validators.minLength(2)]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.pattern(email_pattern),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(11),
            Validators.pattern(phone_patter),
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(pass_patter),
          ]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validators: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  // oninit
  ngOnInit() {}

  // get reactive form error
  get f() {
    return this.roomRegisterForm.controls;
  }

  // submit
  submit() {
    if (this.roomRegisterForm.invalid) {
      // let error = getFormErrors(this.roomRegisterForm);
      let error = calculateErrors(this.roomRegisterForm);
      console.log('all errors');
      console.log(error);
      let res = this.common.errorAlert(
        error,
        'danger',
        this.callbackRes.bind(this)
      );
      console.log(res);
    } else {
      let res = this.common.sucessAlert(
        'Your account created successfully. Thanks you to join in our organisation'
      );
      console.log(res);
    }
    //this.router.navigate(['/join-room']);
  }
  callbackRes(res) {
    console.log(res);
    console.log(res.data.backData);
  }
  goToSignIn() {
    this.router.navigate(['/user-login']);
  }
}
