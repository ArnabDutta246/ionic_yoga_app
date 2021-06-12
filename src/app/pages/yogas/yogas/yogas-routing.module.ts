import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YogasPage } from './yogas.page';

const routes: Routes = [
  {
    path: '',
    component: YogasPage,
  },
  {
    path: 'create-yoga',
    loadChildren: () =>
      import('../create-yoga/create-yoga.module').then(
        (m) => m.CreateYogaPageModule
      ),
  },
  {
    path: 'update-yoga',
    loadChildren: () =>
      import('../update-yoga/update-yoga.module').then(
        (m) => m.UpdateYogaPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YogasPageRoutingModule {}
