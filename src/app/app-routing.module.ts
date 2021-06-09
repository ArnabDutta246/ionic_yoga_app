import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './shared/authguard/authguard.service';

const routes: Routes = [
  {
    path: 'user-login',
    loadChildren: () =>
      import('./pages/user-onboard/user-login/user-login.module').then(
        (m) => m.UserLoginPageModule
      ),
  },
  {
    path: 'user-register',
    loadChildren: () =>
      import('./pages/user-onboard/user-register/user-register.module').then(
        (m) => m.UserRegisterPageModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthguardService],
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: '',
    redirectTo: '/user-login',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
