import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(public http: Http, private storage: Storage) { 

  }

  private accessToken() {
    this.storage.get('userProfile').then((val) => {
      if(val != null) {
        return val;
      }
    });
    return "";
  }

  public get(link="") {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", '*');    
    headers.append("Authorization", 'Bearer ' + this.accessToken());
    const requestOptions = new RequestOptions({ headers: headers });
    
    return this.http.get(link, requestOptions); 
  }

  public post(link="", payload="") {

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Authorization", 'Bearer ' + this.accessToken()); 
        const requestOptions = new RequestOptions({ headers: headers });

        return this.http.post(link, payload, requestOptions);
  }
}
