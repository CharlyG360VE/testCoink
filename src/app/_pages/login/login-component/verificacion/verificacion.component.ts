import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  verifyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routes: Router )
  {
    this.getForm();
  }

  ngOnInit(): void {
  }

  getForm() {
    this.verifyForm = this.fb.group({
      code: [ null, Validators.required ]
    });
  }

  save() {
    console.log( this.verifyForm );
    this.routes.navigateByUrl( '/', {skipLocationChange: true} )
      .then( () => this.routes.navigate( [ '/home' ] ) );
  }

}
