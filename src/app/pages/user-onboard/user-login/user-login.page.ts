import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorMessage } from 'src/app/form-validators/validator-messages';
import { calculateErrors } from 'src/app/form-validators/validators';
import { User } from 'src/app/models/user/user.model';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
import { UserRegisterService } from 'src/app/shared/user-register/user-register.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
  //variables
  loginForm: FormGroup;
  isSubmit: boolean = false;
  validation_messages = ValidatorMessage;
  togglePassField: boolean = false;

  //constructor
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private userRegService: UserRegisterService,
    private common: CommonComponentService
  ) {
    this.loginForm = this.formBuilder.group({
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
    return this.loginForm.controls;
  }

  // submit
  submit() {
    if (this.loginForm.invalid) {
      let error = calculateErrors(this.loginForm);
      this.common.errorAlert(error, 'danger');
    } else {
      let user: User = this.loginForm.value;
      console.log('get user data', user);
      this.userRegService.checkTheUserExist(user, true).then((res: any) => {
        if (res.isExist && res.credential) {
          this.common.presentToaster('Welcome back !!');
          this.router.navigate(['/home']);
        } else if (res.isExist && !res.credential) {
          this.common.errorAlert([
            'Your login creation is mismatch. Please enter correct email address and password',
          ]);
        } else {
          this.common.waringAlert(
            [
              'This user is not registered yet.Please visit sign up page. Do you want to create new account?',
            ],
            'warning',
            this.goToSignUp.bind(this)
          );
        }
      });
    }
  }
  goToSignUp() {
    this.router.navigate(['/user-register']);
  }
}
