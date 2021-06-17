import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutinePageRoutingModule } from './routine-routing.module';

import { RoutinePage } from './routine.page';
import { ProfileHeaderComponent } from 'src/app/components/profile-header/profile-header.component';
import { YogaDetailsModule } from '../../yogas/yoga-details/yoga-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutinePageRoutingModule,
    YogaDetailsModule,
  ],
  declarations: [RoutinePage, ProfileHeaderComponent],
})
export class RoutinePageModule {}
