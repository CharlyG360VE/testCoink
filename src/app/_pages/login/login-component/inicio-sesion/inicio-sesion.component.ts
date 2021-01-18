import { CryptoService } from './../../../../services/cryptoService/crypto.service';
import { LoginService } from './../../../../services/loginService/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
//SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routes: Router,
    private loginSvc: LoginService,
    private cryptoSvc: CryptoService )
  {
    this.getForm();
  }

  ngOnInit(): void {
  }

  getForm() {
    this.loginForm = this.fb.group({
      username: [ null, Validators.required ],
      password: [ null, Validators.required ]
    });
  }

  save() {
    if ( this.loginForm.invalid === true ) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Los campos de inicio son obligatorios.',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    const credentials = {
      payload : this.cryptoSvc.encrypt(
        {
          user_mail: this.loginForm.get( 'username' ).value,
          user_password: this.loginForm.get( 'password' ).value
        }
      )
    }
    console.log( credentials );
    this.loginSvc.login( credentials )
      .subscribe(
        () => {
          this.routes.navigateByUrl( '/', {skipLocationChange: true} ).then(
            () => this.routes.navigate(
              [
                '/codeVerify'
              ]
            )
          );
        },
        err => {
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: `${ err.error.message }`,
            showConfirmButton: false,
            timer: 2500
          })
        }
      );
  }

}
