import { environment } from './../../../environments/environment';
import { CryptoService } from './../cryptoService/crypto.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${ environment.apiUrl }/login?apiKey=252156`;

  constructor(
    private cryptoSvc: CryptoService,
    private http: HttpClient )
  { }

  login( credentials: any ) {
    return this.http.post<string>( this.apiUrl, credentials )
      .pipe(
        map(
          response => {
            localStorage.setItem('auth-token', response);
            return;
          }
        )
      )
  }

}
