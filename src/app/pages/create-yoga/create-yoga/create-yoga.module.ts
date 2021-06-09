import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateYogaPageRoutingModule } from './create-yoga-routing.module';

import { CreateYogaPage } from './create-yoga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateYogaPageRoutingModule
  ],
  declarations: [CreateYogaPage]
})
export class CreateYogaPageModule {}
