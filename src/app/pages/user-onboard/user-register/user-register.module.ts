import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UserRegisterPageRoutingModule } from './user-register-routing.module';

import { UserRegisterPage } from './user-register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserRegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UserRegisterPage, AlertModalComponent],
})
export class UserRegisterPageModule {}
