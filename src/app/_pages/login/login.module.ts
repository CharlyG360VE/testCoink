import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from './login-component/inicio-sesion/inicio-sesion.component';
import { VerificacionComponent } from './login-component/verificacion/verificacion.component';


@NgModule({
  declarations: [LoginComponent, InicioSesionComponent, VerificacionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
