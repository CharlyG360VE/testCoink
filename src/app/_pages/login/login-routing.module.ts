import { VerificacionComponent } from './login-component/verificacion/verificacion.component';
import { InicioSesionComponent } from './login-component/inicio-sesion/inicio-sesion.component';
import { LoginComponent } from './login-component/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: 'iniciarSesion',
        component: InicioSesionComponent
      },
      {
        path: 'codeVerify',
        component: VerificacionComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'iniciarSesion'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
