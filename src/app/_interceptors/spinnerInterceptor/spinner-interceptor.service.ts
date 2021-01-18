import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  peticiones = 0;

  constructor( private spinner: NgxSpinnerService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinner.show();
    this.peticiones++;

    return next.handle(req)
      .pipe ( 
        finalize( () => {
          this.peticiones--;
          if ( this.peticiones === 0 ) this.spinner.hide ()
        } )
      );
  }
}
