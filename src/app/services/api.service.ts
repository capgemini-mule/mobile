import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';

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

  readonly URL_LOGIN: string = "http://autorizacao-proxy.br-s1.cloudhub.io/token"
  readonly URL_LOGOUT: string = "http://autorizacao-proxy.br-s1.cloudhub.io/logout"
  readonly URL_CADASTRAR: string = "http://autorizacao-proxy.br-s1.cloudhub.io/signup"
  readonly URL_RESET_SENHA: string = "http://autorizacao-proxy.br-s1.cloudhub.io/reset"
  readonly URL_PERFIL: string = "http://autorizacao-proxy.br-s1.cloudhub.io/userinfo/{email}"
  readonly URL_SERVICOS: string = "http://servicos-proxy.br-s1.cloudhub.io/servicos"
  readonly URL_TIPOS_IDENTIFICACAO: string = "http://tipoidentificacao-proxy.br-s1.cloudhub.io/tipoIdentificacao"
  readonly URL_ORGAO: string = "http://orgaos-proxy.br-s1.cloudhub.io/orgaos"

  // Não utilizados
  readonly URL_MATRICULA_SERIES: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/series/{dataNascimento}"
  readonly URL_MATRICULA_ESCOLAS: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/escolas/{codSerie}"
  readonly URL_MATRICULA_INSCRICAO: string = "http://inscricaomatriculaescolar-cogel-proxy.br-s1.cloudhub.io/inscricao"

  private accessToken : string = null;

  constructor(private http: HTTP) {
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private isOnline(): boolean {
    return navigator.onLine;
  }

  public request(reqOptions: RequestOptions): Promise<any> {
    if (!this.isOnline()) {
      return Promise.reject(this.montarErroTipo(TipoErro.SEM_INTERNET));
    }

    const url = reqOptions.url;
    const body = reqOptions.body;
    const method = reqOptions.method ? reqOptions.method.toUpperCase() : 'GET';

    this.http.setDataSerializer(reqOptions.serialize ? reqOptions.serialize : 'json');

    const options = {
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


    let promise: Promise<HTTPResponse>;
    switch (method) {
      case 'DELETE':
        promise = this.http.delete(url, options.params, options.headers);
        break;
      case 'PATCH':
        promise = this.http.patch(url, body, options.headers);
        break;
      case 'PUT':
        promise = this.http.put(url, body, options.headers);
        break;
      case 'POST':
        promise = this.http.post(url, body, options.headers);
        break;
      // case 'GET':
      default:
        promise = this.http.get(url, options.params, options.headers);
        break;
    }

    const responseJson = reqOptions.responseType !== 'text';

    return new Promise<any>((resolve, reject) => {
      promise
        .then((res) => {
          const response = { ...res };
          if (responseJson && !!res.data) {
            response['json'] = JSON.parse(res.data);
          }
          resolve(response);
        })
        .catch((error: HTTPResponse) => {
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

  private montarErroHttp(erroHttp: HTTPResponse): ErroHttp {
    console.log('montarErroHttp erroHttp = ', erroHttp);
    const erro = {
      status: erroHttp.status,
      tipo: TipoErro.API,
      // TODO verificar mensagem de erro genérico
      mensagem: "Sua solicitação não pôde ser atendida. Por favor, tente novamente"
    };

    return erro;
  }


}
