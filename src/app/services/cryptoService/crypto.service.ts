import { Injectable } from '@angular/core';
import { enc, AES, mode, pad, MD5 } from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private static CONFIG = {
    mode: mode.ECB,
    padding: pad.Pkcs7
  };

  constructor() { }

  encrypt( message: any ): any {
    const payload = AES.encrypt( JSON.stringify( message ), this.getKey(), CryptoService.CONFIG );

    return payload.ciphertext.toString( enc.Base64 );
  }

  decrypt( message: any ): any {
    const payload = AES.decrypt( message, this.getKey(), CryptoService.CONFIG );

    return JSON.parse( payload.toString( enc.Utf8 ) );
  }

  decryptString( message: string ) {
    const toEncryptArray = enc.Base64.parse(message);
    const payload = AES.decrypt(toEncryptArray, this.getKey(), CryptoService.CONFIG);
    
    return payload.toString(enc.Utf8);
  }

  private getKey() {
    return enc.Hex.parse( MD5( environment.key ).toString() );
  }

}
