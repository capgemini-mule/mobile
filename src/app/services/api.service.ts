import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { Http, ResponseType, ResponseContentType } from '@angular/http';

export interface RequestOptions {
  url: string;
  body?: any;
  method?: string;
  headers?: any;
  queryParams?: any;
  responseType?: string;
  serialize?: 'urlencoded' | 'json' | 'utf8' | 'multipart';
  nameFile?: string;
}

export interface ErroHttp {
  status: number;
  tipo: TipoErro;
  mensagem: string;
}

export enum TipoErro {
  SEM_INTERNET = 0,
  API // erro enviado da api?
}

declare let navigator;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // mais uma troca de URLs
  readonly URL_LOGIN: string = "http://autorizacao-cogel.us-e2.cloudhub.io/api/token"
  readonly URL_CADASTRAR: string = "http://autorizacao-cogel.us-e2.cloudhub.io/api/signup"
  readonly URL_LOGOUT: string = "http://autorizacao-cogel.us-e2.cloudhub.io/api/logout"
  readonly URL_RESET_SENHA: string = "http://autorizacao-cogel.us-e2.cloudhub.io/api/reset"
  readonly URL_PERFIL: string = "http://autorizacao-cogel.us-e2.cloudhub.io/api/userinfo/{email}"

  //mais uma provisoria:
  // readonly URL_RESET_SENHA: string = "http://reset.us-e2.cloudhub.io/api/reset"

  // URLs provisórias:
  // readonly URL_LOGIN: string = "http://teste-signon-sem-ssl.us-e2.cloudhub.io/api/token"
  // readonly URL_CADASTRAR: string = "http://teste-signon-sem-ssl.us-e2.cloudhub.io/api/signup"
  // readonly URL_LOGOUT: string = "http://teste-signon-sem-ssl.us-e2.cloudhub.io/api/logout"
  // readonly URL_RESET_SENHA: string = "http://teste-signon-sem-ssl.us-e2.cloudhub.io/api/reset"
  // readonly URL_PERFIL: string = "http://teste-signon-sem-ssl.us-e2.cloudhub.io/api/userinfo/{email}"
  // readonly URL_SERVICOS: string = "http://104.41.9.232:8081/api/servicos"

  // readonly URL_LOGIN: string = "http://autorizacao-proxy.br-s1.cloudhub.io/token"
  // readonly URL_LOGOUT: string = "http://autorizacao-proxy.br-s1.cloudhub.io/logout"
  // readonly URL_CADASTRAR: string = "http://autorizacao-proxy.br-s1.cloudhub.io/signup"
  // readonly URL_RESET_SENHA: string = "http://autorizacao-proxy.br-s1.cloudhub.io/reset"
  // readonly URL_PERFIL: string = "http://autorizacao-proxy.br-s1.cloudhub.io/userinfo/{email}"
  readonly URL_SERVICOS: string = "http://servicos-proxy.br-s1.cloudhub.io/servicos"
  readonly URL_TIPOS_IDENTIFICACAO: string = "http://tipoidentificacao-proxy.br-s1.cloudhub.io/tipoIdentificacao"
  readonly URL_ORGAO: string = "http://orgaos-proxy.br-s1.cloudhub.io/orgaos"

  // Não utilizados
  readonly URL_MATRICULA_SERIES: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/series/{dataNascimento}"
  readonly URL_MATRICULA_ESCOLAS: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/escolas/{codSerie}"
  readonly URL_MATRICULA_INSCRICAO: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/inscricao"

  private accessToken : string = null;

  constructor(private http: HTTP,
    private httpBrowser: Http) {
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private isOnline(): boolean {
    return navigator.onLine;
  }

  private requestBrowser( options: any): Promise<any> {
    return this.httpBrowser.request(options.url, {
      body : options.body,
      headers: options.headers,
      method: options.method,
      params: options.params,
      responseType: ResponseContentType.Json
    }).toPromise();
  }

  private requestNative(options: any): Promise<any> {
    switch (options.method) {
      case 'DELETE':
        return this.http.delete(options.url, options.params, options.headers);
      case 'PATCH':
        return this.http.patch(options.url, options.body, options.headers);
      case 'PUT':
        return this.http.put(options.url, options.body, options.headers);
      case 'POST':
        return this.http.post(options.url, options.body, options.headers);
      // case 'GET':
      default:
        return this.http.get(options.url, options.params, options.headers);
    }
  }

  public request(reqOptions: RequestOptions): Promise<any> {
    if (!this.isOnline()) {
      return Promise.reject(this.montarErroTipo(TipoErro.SEM_INTERNET));
    }

    const options = {
      method: reqOptions.method ? reqOptions.method.toUpperCase() : 'GET',
      url: reqOptions.url,
      body: reqOptions.body,
      headers: null,
      params: null,
    };

    // headers:
    options.headers = {
      "Accept": 'application/json',
      "Content-Type": 'application/json',
    };
    if (this.accessToken) {
      options.headers["Authorization"] = 'Bearer ' + this.accessToken;
    }
    if (reqOptions.headers) {
      for (const key in reqOptions.headers) {
        if (key) {
          options.headers[key] = reqOptions.headers[key];
        }
      }
    }

    // query params:
    if (reqOptions.queryParams) {
      options.params = {};
      for (const key in reqOptions.queryParams) {
        if (key) {
          options.params[key] = reqOptions.queryParams[key] + '';
        }
      }
    }

    const responseJson = reqOptions.responseType !== 'text';

    let promise: Promise<any>;
    let isNative = window.cordova;
    if (isNative) {
      this.http.setDataSerializer(reqOptions.serialize ? reqOptions.serialize : 'json');
      promise = this.requestNative(options);
    } else {
      promise = this.requestBrowser(options);
    }

    ////////
    console.log(`[API] request ${options.method} - ${options.url}`);
    ////////

    return new Promise<any>((resolve, reject) => {
      promise
        .then((res) => {
          ////////
          console.log(`[API] response ${options.method} - ${options.url} , `, res);
          ////////
          const response = { ...res };
          if (isNative) {
            if (responseJson && !!res.data) {
              response['json'] = JSON.parse(res.data);
            }
            resolve(response);
          } else { // browser
            if ( responseJson ) {
              response['json'] = res.json();
            } else if ( res.type == ResponseContentType.Text ) {
              response['text'] = res.text();
            }
            resolve(response);
          }
        })
        .catch((error: any) => {
          ////////
          console.log(`[API] error ${options.method} - ${options.url} , `, error);
          ////////
          reject(this.montarErroHttp(error));
        });
    });
  }


  private montarErroTipo(erro: TipoErro): ErroHttp {
    return {
      status: 0,
      tipo: erro,
      // TODO verificar mensagem de conexão
      mensagem: 'Sem Internet. Verifique a sua conexão.'
    };
  }

  private montarErroHttp(erroHttp: any): ErroHttp {
    const erro = {
      status: erroHttp.status,
      tipo: TipoErro.API,
      // TODO verificar mensagem de erro genérico
      mensagem: "Sua solicitação não pôde ser atendida. Por favor, tente novamente"
    };

    if (erroHttp.status == 401) {
      erro.mensagem = "Você não tem permissão para essa solicitação.";
    }

    return erro;
  }


}
