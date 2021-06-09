import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinRoomPageRoutingModule } from './join-room-routing.module';

import { JoinRoomPage } from './join-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinRoomPageRoutingModule
  ],
  declarations: [JoinRoomPage]
})
export class JoinRoomPageModule {}
