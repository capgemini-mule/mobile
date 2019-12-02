import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(public http: Http) { 

  }

  public get(link=""){

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", '*');    
    const requestOptions = new RequestOptions({ headers: headers });
    
    return this.http.get(link, requestOptions); 
    
  }

  public post(link="", payload=""){

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        const requestOptions = new RequestOptions({ headers: headers });
        
        return this.http.post(link, payload, requestOptions);
        
  }


}
