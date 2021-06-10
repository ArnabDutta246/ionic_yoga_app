import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateYogaPage } from './create-yoga.page';

const routes: Routes = [
  {
    path: '',
    component: CreateYogaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateYogaPageRoutingModule {}
