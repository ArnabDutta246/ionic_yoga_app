import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateYogaPage } from './update-yoga.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateYogaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateYogaPageRoutingModule {}
