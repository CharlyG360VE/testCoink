import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = `${ environment.apiUrl }/pockets/reports/transactions/purchases`;

  constructor( private http: HttpClient ) { }

  getPurchases( purchases: any ) {
    return this.http.post( `${ this.apiUrl }?apiKey=252156`, purchases );
  }

  exportPurchases( purchases: any ) {
    return this.http.post( `${ this.apiUrl }/export?apiKey=252156`, purchases );
  }
}
