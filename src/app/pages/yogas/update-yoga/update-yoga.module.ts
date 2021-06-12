import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateYogaPageRoutingModule } from './update-yoga-routing.module';

import { UpdateYogaPage } from './update-yoga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateYogaPageRoutingModule,
  ],
  declarations: [UpdateYogaPage],
})
export class UpdateYogaPageModule {}
