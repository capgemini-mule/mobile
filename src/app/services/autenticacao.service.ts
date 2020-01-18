import { Usuario } from './../types/Usuario';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { DialogService } from './../services/ui/dialog.service';
import { NavController, AlertController } from '@ionic/angular';
import { Orgao } from '../types/Orgao';
import { ApiService } from './api.service';
import { RequestInscricaoMatricula } from '../types/RequestInscricaoMatricula';
import { resolve } from 'url';
import { CadastroUsuario } from '../types/CadastroUsuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  readonly STORAGE_KEY_USER = "lastUser"

  public static usuario = new Usuario()

  // os codigos dos orgaos cadastrados devem ser enviados (NÃO são auto-increment na tabela)
  // por isso vamos manter o maior para salvar um novo como maiorCodigo + 1
  private maiorCodigo: number;


  constructor(private storage: Storage, 
    private dialogService: DialogService,
    public navCtrl: NavController,
    public alertController: AlertController,
    private apiService: ApiService) { 
  }

  public login(usuario: string, senha: string) {
    return new Promise<any>((resolve, reject) => {
      this.apiService.request({
        method: "POST",
        url: this.apiService.URL_LOGIN,
        body : {
          username: usuario,
          password: senha
        }
      })
      .then((result) => {
        let autenticacao = result.json;
        if(autenticacao.access_token) {
          this.apiService.setAccessToken(autenticacao.access_token);
          this.dadosUsuario(usuario, autenticacao.access_token)
            .then(resolve)
            .catch(reject);
        } else {
          reject({mensagem : "Usuário ou senha inválidos"});
        }
      })
      .catch(reject);
    });
  }

  public dadosUsuario(email: string, acessToken: string) {
    let emailEncoded = encodeURIComponent(email);
    return new Promise<any>((resolve, reject) =>{
      this.apiService.request({
        method: 'GET',
        url : this.apiService.URL_PERFIL.replace('{email}', emailEncoded),
      }).then( result => {
        AutenticacaoService.usuario = result.json
        AutenticacaoService.usuario.accessToken = acessToken
        this.apiService.setAccessToken(acessToken);
        resolve(result);
      }, reject);
    }); 
  }

  async logoff() {
    const alert = await this.alertController.create({
      header: 'Sair',
      message: 'Tem certeza que deseja sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.dialogService.showLoading("Saindo...");
            this.apiService.request({
              method: 'POST',
              url: this.apiService.URL_LOGOUT,
              body: {}
            }).then(result => {
              this.clearUserAndLeave()
            }, err => {
              console.log(this.dialogService.CONSOLE_TAG, err);
              this.clearUserAndLeave()    
            });
          }
        }
      ]
    });

    await alert.present();
  }

  clearUserAndLeave() {
    this.apiService.setAccessToken(null);
    this.setUser(null, () => {
      this.dialogService.hideLoading(() => {
        this.goToLogin()
       });
    })
  }

  public getUser() {
    return this.storage.get(this.STORAGE_KEY_USER).then((val) => {
      return JSON.parse(val);
    });
  }

  public setUser(user: Usuario, callback = null) {
    let userString = JSON.stringify(user);
    this.storage.set(this.STORAGE_KEY_USER, userString).then(() => {
      AutenticacaoService.usuario = user;
      if (callback !== null) {
        callback()
      }
    });
  }

  public goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  public goHomeAsRoot() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  cadastrarUsuario(form: CadastroUsuario, obj: {nome: string, sobrenome: string}) {

    // api falta corrigir os nomes dos campos:
    const json = {
      "username": form.username,
      "nome": obj.nome,
      "sobrenome": obj.sobrenome,
      "nomeCompleto": form.nomeCompleto,
      "cpf": form.cpf,
      "email": form.email,
      "senha": form.senha
    };

    return this.apiService.request({
      method: "post",
      url: this.apiService.URL_CADASTRAR,
      body: json
    });
  }

  resetSenha(email: string) {
    let emailEncoded = encodeURIComponent(email);
    return this.apiService.request({
      url: `${this.apiService.URL_RESET_SENHA}/${emailEncoded}`
    });
  }

  listarServicos()  {
    // ios-
    return new Promise<any>((resolve, reject)=>{
      this.apiService.request({
        url: this.apiService.URL_SERVICOS
      }).then((response)=>{
        response.json.forEach(s => {
          s.icon = "ios-" + s.icon;
        });
        resolve(response);
      })
      .catch(reject);
    }); 
  }

  listarTiposIdentificacao() {
    return this.apiService.request({
      url: this.apiService.URL_TIPOS_IDENTIFICACAO
    });
  }

  listarSeries() {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_SERIES.replace('{dataNascimento}', AutenticacaoService.usuario.dataNascimento)
    });
  }

  listarEscolas() {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_ESCOLAS.replace('{codSerie}', '1')
    });
  }

  inscreverAluno(request: RequestInscricaoMatricula) {
    return this.apiService.request({
      url: this.apiService.URL_MATRICULA_INSCRICAO,
      body: request
    });
  }

  ////////////
  // orgaos

  listarOrgaos() {
    return new Promise<any>((resolve, reject) => {
      this.apiService.request({
        url: this.apiService.URL_ORGAO
      }).then((response) =>{
        this.maiorCodigo = -200;
        response.json.forEach(orgao => {
          this.maiorCodigo = Math.max(this.maiorCodigo, orgao.codigo);
        });
        resolve(response)
      }).catch(reject);
    });
  }

  public salvarOrgao(orgao: Orgao) {
    let json = JSON.parse(JSON.stringify(orgao));
    let method;
    let url = `${this.apiService.URL_ORGAO}`;
    let novoCodigo = this.maiorCodigo + 1;
    if (orgao.codigo) {
      method = "PUT";
      url += `/${orgao.codigo}`;
    } else {
      method = "POST";
      json.codigo = novoCodigo
    }

    return new Promise<any>((resolve, reject) => {
      this.apiService.request({
        method: method,
        url: url,
        body : json
      }).then((response) =>{
        if (method == "POST") {
          this.maiorCodigo = novoCodigo;
        }
        resolve(response);
      })
      .catch(reject);
    });
  }

  public deletarOrgao(orgao: Orgao) {
    return this.apiService.request({
      method: "DELETE",
      url: `${this.apiService.URL_ORGAO}/${orgao.codigo}`,
      body : orgao
    });
  }

}
