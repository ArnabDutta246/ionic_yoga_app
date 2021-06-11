import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../shared/authguard/authguard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate: [AuthguardService],
    children: [
      {
        path: 'routine',
        loadChildren: () =>
          import('../pages/routine/routine/routine.module').then(
            (m) => m.RoutinePageModule
          ),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('../pages/progress/progress/progress.module').then(
            (m) => m.ProgressPageModule
          ),
      },
      {
        path: 'yogas',
        loadChildren: () =>
          import('../pages/yogas/yogas/yogas.module').then(
            (m) => m.YogasPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'routine',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'routine',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
