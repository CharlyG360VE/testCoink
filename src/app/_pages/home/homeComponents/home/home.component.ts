import { CryptoService } from './../../../../services/cryptoService/crypto.service';
import { HomeService } from './../../../../services/homeService/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//SweetAlert
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private vaultId = 'b73bde9f-6891-4b2e-847e-484be1830794';
  dateForm: FormGroup;
  displayedColumns: string[] = ['Nombre', 'Cel', 'Email', 'Fecha', 'Edad'];
  dataSource: MatTableDataSource<any>;
  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator;
  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  campos: any[] = [
    {viewValue: 'Nombre'},
    {viewValue: 'Cel'},
    {viewValue: 'Email'},
    {viewValue: 'Fecha de compra'},
    {viewValue: 'Edad'}
  ];

  constructor(
    private fb: FormBuilder,
    private homeSvc: HomeService,
    private cryptoSvc: CryptoService,
    private datePipe: DatePipe ) {
    this.getForm();
  }

  ngOnInit(): void {
    const dataTable = [];
    this.dataSource = new MatTableDataSource( dataTable );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getForm() {
    this.dateForm = this.fb.group( {
      firstDate: [ null, Validators.required ],
      lastDate: [ null, Validators.required ],
      buscar: [ null, Validators.required ],
      campo: [ null, Validators.required ]
    } );
  }

  limpiarFormulario() {
    this.dateForm.setValue(
      {
        firstDate: null,
        lastDate: null,
        buscar: null,
        campo: null
      }
    )
  }

  applyFilter() {
    const evento = this.dateForm.get( 'buscar' ).value;
    const filterValue = evento;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dateForm.get( 'buscar' ).setValue( null );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPurchases() {
    const notDecrypt = {
      vault_id: this.vaultId,
      filter_field: this.dateForm.get( 'campo' ).value,
      filter_value: this.dateForm.get( 'buscar' ).value,
      begin_date: new Date( this.dateForm.get( 'firstDate' ).value ).toISOString(),
      end_date: new Date( this.dateForm.get( 'lastDate' ).value ).toISOString(),
      page: 1,
      items_per_page: this.dataSource.paginator.pageSize
    }
    const purchases: any = {
      payload: this.cryptoSvc.encrypt(
        {
          vault_id: this.vaultId,
          filter_field: this.dateForm.get( 'campo' ).value,
          filter_value: this.dateForm.get( 'buscar' ).value,
          begin_date: new Date( this.dateForm.get( 'firstDate' ).value ).toISOString(),
          end_date: new Date( this.dateForm.get( 'lastDate' ).value ).toISOString(),
          page: 1,
          items_per_page: this.dataSource.paginator.pageSize
        }
      )
    }
    this.homeSvc.getPurchases( purchases )
      .subscribe(
        ( response: any ) => {
          console.log( this.cryptoSvc.decrypt( response.payload ) );
        }
      );
  }

  exportPurchases() {

    const purchases: any = {
      payload: this.cryptoSvc.encrypt(
        {
          vault_id: this.vaultId,
          filter_field: this.dateForm.get( 'campo' ).value,
          filter_value: this.dateForm.get( 'buscar' ).value,
          begin_date: new Date( this.dateForm.get( 'firstDate' ).value ).toISOString(),
          end_date: new Date( this.dateForm.get( 'lastDate' ).value ).toISOString()
        }
      )
    }
    console.log( purchases );
    this.homeSvc.exportPurchases( purchases )
    .subscribe(
      ( response: any ) => {
        console.log( this.cryptoSvc.decryptString( this.cryptoSvc.decrypt( response.payload ) ) );
      }
    )
  }

}
