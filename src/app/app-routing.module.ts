import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import( './_pages/login/login.module' )
      .then( module => module.LoginModule )
  },
  {
    path: 'home',
    loadChildren: () => import( './_pages/home/home.module' )
      .then( module => module.HomeModule )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
