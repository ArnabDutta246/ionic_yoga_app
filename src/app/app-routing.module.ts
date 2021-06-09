import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'user-register',
    loadChildren: () =>
      import('./pages/user-onboard/user-register/user-register.module').then(
        (m) => m.UserRegisterPageModule
      ),
  },
  {
    path: 'user-login',
    loadChildren: () =>
      import('./pages/user-onboard/user-login/user-login.module').then(
        (m) => m.UserLoginPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'user-register',
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
