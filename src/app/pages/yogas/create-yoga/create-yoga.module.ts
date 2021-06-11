import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateYogaPageRoutingModule } from './create-yoga-routing.module';

import { CreateYogaPage } from './create-yoga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateYogaPageRoutingModule,
  ],
  declarations: [CreateYogaPage],
})
export class CreateYogaPageModule {}
