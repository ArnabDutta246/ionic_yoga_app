import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRoutinePageRoutingModule } from './create-routine-routing.module';

import { CreateRoutinePage } from './create-routine.page';

import { ChooseYogaModule } from './choose-yoga/choose-yoga.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRoutinePageRoutingModule,
    ChooseYogaModule,
  ],
  declarations: [CreateRoutinePage],
})
export class CreateRoutinePageModule {}
