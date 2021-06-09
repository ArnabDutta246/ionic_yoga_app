import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinRoomPage } from './join-room.page';

const routes: Routes = [
  {
    path: '',
    component: JoinRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinRoomPageRoutingModule {}
