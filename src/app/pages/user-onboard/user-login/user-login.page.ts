import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorMessage } from 'src/app/form-validators/validator-messages';
import { calculateErrors } from 'src/app/form-validators/validators';
import { loginRegResponse, User } from 'src/app/models/user/user.model';
import { CommonComponentService } from 'src/app/shared/common-component/common-component.service';
import { SessionService } from 'src/app/shared/session/session.service';
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
    private common: CommonComponentService,
    private session: SessionService
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
  async ngOnInit() {
    await this.sessionCheck();
  }

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
      this.userRegService
        .checkTheUserExist(user, true)
        .then((res: loginRegResponse) => {
          console.log(res);
          if (res.isExist && res.credential) {
            this.common.presentToaster('Welcome back !!');
            this.resetForm();
            this.goToHome();
          } else if (res.isExist && !res.credential) {
            this.common.errorAlert([
              'Your login creation is mismatch. Please enter correct email address and password',
            ]);
          } else {
            this.resetForm();
            this.common.warningAlert(
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

  // navigate sign up
  public goToSignUp(): void {
    this.router.navigate(['/user-register']);
  }
  //navigate home
  public goToHome(): void {
    this.router.navigate(['/home/routine']);
  }
  // session check
  public sessionCheck(): void {
    this.session.initSession().then((res) => this.goToHome());
  }
  public resetForm(): void {
    this.loginForm.reset();
  }
}
