import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YogasPageRoutingModule } from './yogas-routing.module';

import { YogasPage } from './yogas.page';
import { ProfileHeaderComponent } from 'src/app/components/profile-header/profile-header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, YogasPageRoutingModule],
  declarations: [YogasPage, ProfileHeaderComponent],
})
export class YogasPageModule {}
