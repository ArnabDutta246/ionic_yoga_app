import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRoomPage } from './create-room.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoomPageRoutingModule {}
