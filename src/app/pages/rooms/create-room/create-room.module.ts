import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRoomPageRoutingModule } from './create-room-routing.module';

import { CreateRoomPage } from './create-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRoomPageRoutingModule
  ],
  declarations: [CreateRoomPage]
})
export class CreateRoomPageModule {}
