import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UserLoginPageRoutingModule } from './user-login-routing.module';

import { UserLoginPage } from './user-login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UserLoginPage],
})
export class UserLoginPageModule {}
