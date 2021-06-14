import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutinePage } from './routine.page';

const routes: Routes = [
  {
    path: '',
    component: RoutinePage,
  },
  {
    path: 'create-routine',
    loadChildren: () =>
      import('../create-routine/create-routine.module').then(
        (m) => m.CreateRoutinePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutinePageRoutingModule {}
