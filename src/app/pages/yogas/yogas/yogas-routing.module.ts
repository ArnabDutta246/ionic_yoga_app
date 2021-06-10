import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YogasPage } from './yogas.page';

const routes: Routes = [
  {
    path: '',
    component: YogasPage,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YogasPageRoutingModule {}
