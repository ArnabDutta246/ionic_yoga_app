import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRoutinePage } from './create-routine.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutinePageRoutingModule {}
